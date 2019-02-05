//import { AuthGuard } from './guards/auth.guard';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PosConsolidadaComponent } from './pos-consolidada/pos-consolidada.component';
import { MovimientoComponent } from './movimientos/movimientos.component';
import { PrestamosSoliComponent } from './prestamos-solicitud/prestamos-soli.component';
import { PrestamosPagosComponent } from './prestamos-pagos/prestamos-pagos.component';
import { PrestamoSimuladorComponent } from './prestamos-simulador/prestamo-simu.component';
import { TransfDirectaComponent } from './transf-directa/transf-directa.component';
import { TransfHistorialComponent } from './transf-historial/transf-historial.component';
import { TransfOtrosComponent } from './transf-otros/transf-otros.component';
import { LoginComponent } from './login/login.component';
import { TemplateComponent } from './template/template.component';
import { AmortizacionComponent } from './amortizacion/amortizacion.component';
import { LoginService } from './Services/Service/login.service';
//import {AuthorizatedGuard} from "./Services/guards/authorizated.guard";

export const routes: Routes = [
    { path: '', component: LoginComponent, },
    {
        path: 'template', component: TemplateComponent, children: [
            { path: 'main', component: PosConsolidadaComponent },
            { path: 'movimientos', component: MovimientoComponent },
            { path: 'solicitudp', component: PrestamosSoliComponent },
            { path: 'pagosp', component: PrestamosPagosComponent },
            { path: 'simuladorp', component: PrestamoSimuladorComponent },
            { path: 'transfdirecta', component: TransfDirectaComponent },
            { path: 'transfhistorial', component: TransfHistorialComponent },
            { path: 'transfotros', component: TransfOtrosComponent },
            { path: 'amortizacion', component: AmortizacionComponent }
        ]
    },
];
export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' });
