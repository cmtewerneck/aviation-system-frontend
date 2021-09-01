import { Route } from '@angular/router';
import { CalendarComponent } from 'app/modules/cadastros/calendario/calendar.component';
import { CalendarSettingsComponent } from 'app/modules/cadastros/calendario/settings/settings.component';
import { CalendarCalendarsResolver, CalendarSettingsResolver, CalendarWeekdaysResolver } from 'app/modules/cadastros/calendario/calendar.resolvers';

export const calendarRoutes: Route[] = [
    {
        path     : '',
        component: CalendarComponent,
        resolve  : {
            calendars: CalendarCalendarsResolver,
            settings : CalendarSettingsResolver,
            weekdays : CalendarWeekdaysResolver
        }
    },
    {
        path     : 'settings',
        component: CalendarSettingsComponent,
        resolve  : {
            settings: CalendarSettingsResolver
        }
    }
];
