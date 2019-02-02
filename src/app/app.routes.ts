import { AuthGuard } from './guards/auth.guard';
import { Routes, RouterModule } from '@angular/router';
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

export const routes: Routes = [
    { path: '', component: LoginComponent },
    {
        path: 'template', component: TemplateComponent, children: [
            { path: 'main', component: PosConsolidadaComponent,canActivate: [AuthGuard]},
            { path: 'movimientos', component: MovimientoComponent },
            { path: 'solicitudp', component: PrestamosSoliComponent },
            { path: 'pagosp', component: PrestamosPagosComponent },
            { path: 'simuladorp', component: PrestamoSimuladorComponent },
            { path: 'transfdirecta', component: TransfDirectaComponent },
            { path: 'transfhistorial', component: TransfHistorialComponent },
            { path: 'transfotros', component: TransfOtrosComponent }
        ]
    },
];
export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' });
