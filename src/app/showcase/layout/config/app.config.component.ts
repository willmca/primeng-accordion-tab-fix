import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { DomHandler } from 'primeng/dom';
import { Subscription } from 'rxjs';
import { AppConfig } from '../../domain/appconfig';
import { AppConfigService } from '../../service/appconfigservice';

@Component({
    selector: 'app-config',
    templateUrl: './app.config.component.html'
})
export class AppConfigComponent implements OnInit, OnDestroy {
    scale: number = 14;
    inputStyles = [
        { label: 'Outlined', value: 'outlined' },
        { label: 'Filled', value: 'filled' }
    ];
    scales: number[] = [12, 13, 14, 15, 16];

    outsideClickListener: VoidFunction | null;

    config: AppConfig;

    subscription: Subscription;

    sidebarSubscription: Subscription;

    active: boolean;

    compactMaterial: boolean = false;

    lightOnlyThemes = ['fluent-light', 'mira', 'nano'];

    get darkToggleDisabled() {
        return this.lightOnlyThemes.includes(this.config.theme);
    }

    constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2, private el: ElementRef, private router: Router, private configService: AppConfigService) {}

    ngOnInit() {
        this.config = this.configService.config;
        this.sidebarSubscription = this.configService.configActive$.subscribe((value: boolean) => (this.active = value));
        this.subscription = this.configService.configUpdate$.subscribe((config) => {
            this.config = config;
            if (this.config.theme === 'nano') this.scale = 12;
            else this.scale = 14;

            this.applyScale();
        });

        if (this.config.theme === 'nano') this.scale = 12;
    }

    onCompactMaterialChange(event) {
        let theme;
        if(this.config.theme.startsWith('md')) {
            theme = this.config.theme.replace('md', 'mdc');
        } 
        if(this.config.theme.startsWith('mdc')) {
            theme = this.config.theme.replace('mdc', 'md');
            
        }
        this.changeTheme(event, theme, false);
    }

    isThemeActive(theme: string, color: string) {
        let themeName;
        let themePrefix = this.compactMaterial ? 'mdc' : theme;

        if (this.lightOnlyThemes.includes(themePrefix)) {
            themeName = themePrefix;
        } else {
            themeName = themePrefix + (this.config.dark ? '-dark' : '-light');
        }

        if (color) {
            themeName += '-' + color;
        }

        return this.config.theme === themeName;
    }

    hideConfigurator() {
        this.unbindOutsideClickListener();
        this.configService.toggleConfig();
    }

    onConfigButtonClick(event: MouseEvent) {
        this.configService.toggleConfig();

        if (this.active) {
            this.bindOutsideClickListener();
        } else {
            this.unbindOutsideClickListener();
        }
        event.preventDefault();
    }

    changeTheme(event: Event, theme: string, dark: boolean) {
        console.log(event, theme, dark)
        this.configService.changeTheme(event, theme, dark);
    }

    onInputStyleChange() {
        this.configService.updateConfig(this.config);

        if (this.config.inputStyle === 'filled') DomHandler.addClass(document.body, 'p-input-filled');
        else DomHandler.removeClass(document.body, 'p-input-filled');
    }

    onRippleChange() {
        this.configService.updateConfig(this.config);
        if (this.config.ripple) DomHandler.removeClass(document.body, 'p-ripple-disabled');
        else DomHandler.addClass(document.body, 'p-ripple-disabled');
    }

    bindOutsideClickListener() {
        if (!this.outsideClickListener) {
            this.outsideClickListener = this.renderer.listen(this.document, 'click', (event) => {
                if (this.active && this.isOutsideClicked(event)) {
                    this.active = false;
                }
            });
        }
    }

    unbindOutsideClickListener() {
        if (this.outsideClickListener) {
            this.outsideClickListener();
            this.outsideClickListener = null;
        }
    }

    isOutsideClicked(event) {
        return !(this.el.nativeElement.isSameNode(event.target) || this.el.nativeElement.contains(event.target));
    }

    decrementScale() {
        this.scale--;
        this.applyScale();
    }

    incrementScale() {
        this.scale++;
        this.applyScale();
    }

    applyScale() {
        this.renderer.setStyle(this.document.documentElement, 'font-size', this.scale + 'px');
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.sidebarSubscription) {
            this.sidebarSubscription.unsubscribe();
        }
    }
}
