import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
// tslint:disable:max-line-length
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    {path: '', pathMatch : 'full', redirectTo: 'home'},

    // Redirect signed in user to the '/example'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'example'},

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)},
            {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)},
            {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)},
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},
            {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)}
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)}
        ]
    },

    // Landing routes
    {
        path: '',
        component  : LayoutComponent,
        data: {
            layout: 'empty'
        },
        children   : [
            //{path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)},
        ]
    },

    // Admin routes
    {
        path       : '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [
            {path: 'home', loadChildren: () => import('app/modules/cadastros/home/home.module').then(m => m.HomeModule)},
            //{path: 'example', loadChildren: () => import('app/modules/admin/example/example.module').then(m => m.ExampleModule)},
            {path: 'aeronaves', loadChildren: () => import('app/modules/cadastros/aeronave/aeronave.module').then(m => m.AeronaveModule)},
            {path: 'aeronaves/abastecimentos', loadChildren: () => import('app/modules/cadastros/aeronaveAbastecimento/aeronaveAbastecimento.module').then(m => m.AeronaveAbastecimentoModule)},
            {path: 'aeronaves/tarifas', loadChildren: () => import('app/modules/cadastros/aeronaveTarifa/aeronaveTarifa.module').then(m => m.AeronaveTarifaModule)},
            {path: 'rastreadores', loadChildren: () => import('app/modules/cadastros/rastreador/rastreador.module').then(m => m.RastreadorModule)},
            {path: 'veiculos', loadChildren: () => import('app/modules/cadastros/veiculo/veiculo.module').then(m => m.VeiculoModule)},
            {path: 'veiculos/gastos', loadChildren: () => import('app/modules/cadastros/veiculoGasto/veiculoGasto.module').then(m => m.VeiculoGastoModule)},
            {path: 'veiculos/multas', loadChildren: () => import('app/modules/cadastros/veiculoMulta/veiculoMulta.module').then(m => m.VeiculoMultaModule)},
            {path: 'categorias-treinamento', loadChildren: () => import('app/modules/cadastros/categoriaTreinamento/categoriaTreinamento.module').then(m => m.CategoriaTreinamentoModule)},
            {path: 'categorias-voo', loadChildren: () => import('app/modules/cadastros/categoriaVoo/categoriaVoo.module').then(m => m.CategoriaVooModule)},
            {path: 'servicos', loadChildren: () => import('app/modules/cadastros/servico/servico.module').then(m => m.ServicoModule)},
            {path: 'suprimentos', loadChildren: () => import('app/modules/cadastros/suprimento/suprimento.module').then(m => m.SuprimentoModule)},
            {path: 'suprimentos/movimentacoes', loadChildren: () => import('app/modules/cadastros/suprimentoMovimentacao/suprimentoMovimentacao.module').then(m => m.SuprimentoMovimentacaoModule)},
            {path: 'manuais-empresa', loadChildren: () => import('app/modules/cadastros/manualEmpresa/manualEmpresa.module').then(m => m.ManualEmpresaModule)},
            {path: 'manuais-voo', loadChildren: () => import('app/modules/cadastros/manualVoo/manualVoo.module').then(m => m.ManualVooModule)},
            {path: 'cursos', loadChildren: () => import('app/modules/cadastros/curso/curso.module').then(m => m.CursoModule)},
            {path: 'tripulantes', loadChildren: () => import('app/modules/cadastros/tripulante/tripulante.module').then(m => m.TripulanteModule)},
            {path: 'instrutores', loadChildren: () => import('app/modules/cadastros/instrutor/instrutor.module').then(m => m.InstrutorModule)},
            {path: 'mecanicos', loadChildren: () => import('app/modules/cadastros/mecanico/mecanico.module').then(m => m.MecanicoModule)},
            {path: 'agendamentos', loadChildren: () => import('app/modules/cadastros/agendamento/agendamento.module').then(m => m.AgendamentoModule)},
            {path: 'alunos', loadChildren: () => import('app/modules/cadastros/aluno/aluno.module').then(m => m.AlunoModule)},
            {path: 'passagens-aereas', loadChildren: () => import('app/modules/cadastros/passagemAerea/passagemAerea.module').then(m => m.PassagemAereaModule)},
            {path: 'contas-pagar', loadChildren: () => import('app/modules/cadastros/contaPagar/contaPagar.module').then(m => m.ContaPagarModule)},
            {path: 'contas-receber', loadChildren: () => import('app/modules/cadastros/contaReceber/contaReceber.module').then(m => m.ContaReceberModule)},
            {path: 'oficios-emitidos', loadChildren: () => import('app/modules/cadastros/oficioEmitido/oficioEmitido.module').then(m => m.OficioEmitidoModule)},
            {path: 'oficios-recebidos', loadChildren: () => import('app/modules/cadastros/oficioRecebido/oficioRecebido.module').then(m => m.OficioRecebidoModule)},
            {path: 'panoramicos/revendedores', loadChildren: () => import('app/modules/cadastros/revendedor/revendedor.module').then(m => m.RevendedorModule)},
            {path: 'panoramicos/servicos', loadChildren: () => import('app/modules/cadastros/panoramicoServico/panoramicoServico.module').then(m => m.PanoramicoServicoModule)},
            {path: 'panoramicos/financeiro', loadChildren: () => import('app/modules/cadastros/panoramicoFinanceiro/panoramicoFinanceiro.module').then(m => m.PanoramicoFinanceiroModule)},
            {path: 'fornecedores', loadChildren: () => import('app/modules/cadastros/fornecedor/fornecedor.module').then(m => m.FornecedorModule)},
            {path: 'diarias', loadChildren: () => import('app/modules/cadastros/diaria/diaria.module').then(m => m.DiariaModule)},
            //{path: 'calendario', loadChildren: () => import('app/modules/cadastros/calendario/calendar.module').then(m => m.CalendarModule)},
            {path: 'ferramentas', loadChildren: () => import('app/modules/cadastros/ferramenta/ferramenta.module').then(m => m.FerramentaModule)},
            {path: 'ordens-servico', loadChildren: () => import('app/modules/cadastros/ordemServico/ordemServico.module').then(m => m.OrdemServicoModule)},
            {path: 'turmas', loadChildren: () => import('app/modules/cadastros/turma/turma.module').then(m => m.TurmaModule)},
            {path: 'nrts', loadChildren: () => import('app/modules/cadastros/nrt/nrt.module').then(m => m.NrtModule)},
            {path: 'saes', loadChildren: () => import('app/modules/cadastros/sae/sae.module').then(m => m.SaeModule)},
            {path: 'necs', loadChildren: () => import('app/modules/cadastros/nec/nec.module').then(m => m.NecModule)},
            {path: 'listas-passageiros', loadChildren: () => import('app/modules/cadastros/listaPassageiro/listaPassageiro.module').then(m => m.ListaPassageiroModule)},
            {path: 'materiais-operacionais', loadChildren: () => import('app/modules/cadastros/materialOperacional/materialOperacional.module').then(m => m.MaterialOperacionalModule)},
            {path: 'ises', loadChildren: () => import('app/modules/cadastros/ise/ise.module').then(m => m.IseModule)},
            {path: 'fips', loadChildren: () => import('app/modules/cadastros/fip/fip.module').then(m => m.FipModule)},
            {path: 'diarios-bordo', loadChildren: () => import('app/modules/cadastros/diarioBordo/diarioBordo.module').then(m => m.DiarioBordoModule)},
            {path: 'cautelas', loadChildren: () => import('app/modules/cadastros/cautela/cautela.module').then(m => m.CautelaModule)},
            {path: 'contratos', loadChildren: () => import('app/modules/cadastros/contrato/contrato.module').then(m => m.ContratoModule)},
            {path: 'fichas-recebimento', loadChildren: () => import('app/modules/cadastros/fichaRecebimento/fichaRecebimento.module').then(m => m.FichaRecebimentoModule)},
            {path: 'relprevs', loadChildren: () => import('app/modules/cadastros/relprev/relprev.module').then(m => m.RelprevModule)},
            {path: 'fichas-operacionais', loadChildren: () => import('app/modules/cadastros/fichaOperacional/fichaOperacional.module').then(m => m.FichaOperacionalModule)},
            {path: 'papeletas', loadChildren: () => import('app/modules/cadastros/papeleta/papeleta.module').then(m => m.PapeletaModule)},
            {path: 'motoristas', loadChildren: () => import('app/modules/cadastros/motorista/motorista.module').then(m => m.MotoristaModule)},
        ]
    }
];



