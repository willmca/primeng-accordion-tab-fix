/**
 * Represents a set of translated strings used in a component or application.
 * @group Interface
 */
export interface Translation {
    startsWith?: string;
    contains?: string;
    notContains?: string;
    endsWith?: string;
    equals?: string;
    notEquals?: string;
    noFilter?: string;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    is?: string;
    isNot?: string;
    before?: string;
    after?: string;
    dateIs?: string;
    dateIsNot?: string;
    dateBefore?: string;
    dateAfter?: string;
    clear?: string;
    apply?: string;
    matchAll?: string;
    matchAny?: string;
    addRule?: string;
    removeRule?: string;
    accept?: string;
    reject?: string;
    choose?: string;
    upload?: string;
    cancel?: string;
    dayNames?: string[];
    dayNamesShort?: string[];
    dayNamesMin?: string[];
    monthNames?: string[];
    monthNamesShort?: string[];
    dateFormat?: string;
    firstDayOfWeek?: number;
    today?: string;
    weekHeader?: string;
    weak?: string;
    medium?: string;
    strong?: string;
    passwordPrompt?: string;
    emptyMessage?: string;
    emptyFilterMessage?: string;
    pending: string;
    chooseYear: string;
    chooseMonth: string;
    chooseDate: string;
    prevDecade: string;
    nextDecade: string;
    prevYear: string;
    nextYear: string;
    prevMonth: string;
    nextMonth: string;
    prevHour: string;
    nextHour: string;
    prevMinute: string;
    nextMinute: string;
    prevSecond: string;
    nextSecond: string;
    am: string;
    pm: string;
    searchMessage: string;
    selectionMessage: string;
    emptySelectionMessage: string;
    emptySearchMessage: string;
    aria?: object;

}
