/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'home',
        title: 'Home',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/home'
    },
    {
        id   : 'fornecedores',
        title: 'Fornecedores',
        type : 'basic',
        icon : 'heroicons_outline:user-group',
        link : '/fornecedores'
    },
    {
        id      : 'operacoes',
        title   : 'Operações',
        type    : 'collapsable',
        icon    : 'heroicons_outline:document-text',
        children: [
            {
                id      : 'diariosBordo',
                title   : 'Diários de Bordo',
                type    : 'basic',
                link    : '/diarios-bordo'
            },
            {
                id   : 'escalas',
                title: 'Escalas',
                type : 'basic',
                link : '/escalas'
            },
            {
                id   : 'papeletas',
                title: 'Papeletas',
                type : 'basic',
                link : '/papeletas'
            },
            {
                id   : 'materialOperacional',
                title: 'Material Operacional',
                type : 'basic',
                link : '/materiais-operacionais'
            },
            {
                id   : 'contrato',
                title: 'Contratos',
                type : 'basic',
                link : '/contratos'
            },
            {
                id   : 'relprev',
                title: 'RELPREV',
                type : 'basic',
                link : '/relprevs'
            }
        ]
    },
    {
        id      : 'treinamentos',
        title   : 'Treinamentos',
        type    : 'collapsable',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id   : 'categoriasTreinamento',
                title: 'Categorias',
                type : 'basic',
                link : '/categorias-treinamento'
            },
            {
                id   : 'nrt',
                title: 'NRT',
                type : 'basic',
                link : 'nrts'
            },
            {
                id   : 'sae',
                title: 'SAE',
                type : 'basic',
                link : 'saes'
            },
            {
                id   : 'nec',
                title: 'NEC',
                type : 'basic',
                link : 'necs'
            },
        ]
    },
    {
        id      : 'coordenacao',
        title   : 'Coordenação de Voo',
        type    : 'collapsable',
        icon    : 'heroicons_outline:location-marker',
        children: [
            {
                id   : 'passagens',
                title: 'Passagens Aéreas',
                type : 'basic',
                link : '/passagens-aereas'
            },
            {
                id   : 'rastreadores',
                title: 'Rastreadores',
                type : 'basic',
                link : '/rastreadores'
            },
            {
                id   : 'fichasOperacionais',
                title: 'Fichas Operacionais',
                type : 'basic',
                link : '/fichas-operacionais'
            },
            {
                id   : 'manifestosPesoBalanceamento',
                title: 'Manifestos de P&B',
                type : 'basic',
                link : '/manifestos-peso-balanceamento'
            },
            {
                id   : 'listaPassageiros',
                title: 'Listas de Passageiros',
                type : 'basic',
                link : '/listas-passageiros'
            }
        ]
    },
    {
        id      : 'voos',
        title   : 'Voos',
        type    : 'collapsable',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id      : 'calendario',
                title   : 'Calendário',
                type    : 'basic',
                link    : '/calendario'
            },
            {
                id      : 'agendamentos',
                title   : 'Agendamentos',
                type    : 'basic',
                link    : '/agendamentos'
            },
            {
                id   : 'categoriasVoos',
                title: 'Categorias',
                type : 'basic',
                link : '/categorias-voo'
            }
        ]
    },
    {
        id      : 'aeronaves',
        title   : 'Aeronaves',
        type    : 'collapsable',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id      : 'listar',
                title   : 'Listar',
                type    : 'basic',
                link    : '/aeronaves'
            },
            {
                id   : 'abastecimentos',
                title: 'Abastecimentos',
                type : 'basic',
                link : '/aeronaves/abastecimentos'
            },
            {
                id   : 'tarifas',
                title: 'Tarifas',
                type : 'basic',
                link : '/aeronaves/tarifas'
            },
            {
                id   : 'diretrizes',
                title: 'Diretrizes',
                type : 'basic',
                link : '/diretrizes'
            }
        ]
    },
    {
        id      : 'manutencao',
        title   : 'Manutenção',
        type    : 'collapsable',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id      : 'ordemServico',
                title   : 'Ordens de Serviço',
                type    : 'basic',
                link    : '/ordens-servico'
            },
            {
                id   : 'servicos',
                title: 'Serviços',
                type : 'basic',
                link : '/servicos'
            },
            {
                id   : 'fichaRecebimento',
                title: 'Ficha de Recebimento',
                type : 'basic',
                link : '/fichas-recebimento'
            },
            {
                id   : 'ferramentas',
                title: 'Ferramentas',
                type : 'basic',
                link : '/ferramentas'
            },
            {
                id   : 'cautela',
                title: 'Cautela',
                type : 'basic',
                link : '/cautelas'
            },
            {
                id   : 'mecanicos',
                title: 'Mecânicos',
                type : 'basic',
                link : '/mecanicos'
            }
        ]
    },
    {
        id      : 'sgso',
        title   : 'SGSO',
        type    : 'collapsable',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id      : 'relatorioSgso',
                title   : 'Relatórios',
                type    : 'basic',
                link    : '/sgso-relatorios'
            },
            {
                id      : 'avisosSgso',
                title   : 'Avisos',
                type    : 'basic',
                link    : '/sgso-avisos'
            }
        ]
    },
    {
        id   : 'tripulantes',
        title: 'Tripulantes',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/tripulantes'
    },
    {
        id      : 'biblioteca',
        title   : 'Biblioteca Técnica',
        type    : 'collapsable',
        icon    : 'heroicons_outline:book-open',
        children: [
            {
                id      : 'manuaisEmpresa',
                title   : 'Manuais da Empresa',
                type    : 'basic',
                link    : '/manuais-empresa'
            },
            {
                id   : 'manuaisVoo',
                title: 'Manuais de Voo',
                type : 'basic',
                link : '/manuais-voo'
            },
            {
                id   : 'legislacao',
                title: 'Legislação',
                type : 'basic',
                link : '/legislacao'
            }
        ]
    },
    {
        id      : 'escola',
        title   : 'Escola',
        type    : 'collapsable',
        icon    : 'heroicons_outline:academic-cap',
        children: [
            {
                id      : 'alunos',
                title   : 'Alunos',
                type    : 'basic',
                link    : '/alunos'
            },
            {
                id   : 'cursos',
                title: 'Cursos',
                type : 'basic',
                link : '/cursos'
            },
            {
                id   : 'turmas',
                title: 'Turmas',
                type : 'basic',
                link : '/turmas'
            },
            {
                id   : 'instrutores',
                title: 'Instrutores',
                type : 'basic',
                link : '/instrutores'
            },
            {
                id   : 'fips',
                title: 'FIP',
                type : 'basic',
                link : '/fips'
            },
            {
                id   : 'ises',
                title: 'ISE',
                type : 'basic',
                link : '/ises'
            }
        ]
    },
    {
        id      : 'panoramico',
        title   : 'Panorâmico',
        type    : 'collapsable',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id      : 'servicos',
                title   : 'Serviços',
                type    : 'basic',
                link    : '/panoramicos/servicos'
            },
            {
                id      : 'financeiro',
                title   : 'Financeiro',
                type    : 'basic',
                link    : '/panoramicos/financeiro'
            },
            {
                id      : 'revendedores',
                title   : 'Revendedores',
                type    : 'basic',
                link    : '/panoramicos/revendedores'
            }
        ]
    },
    {
        id      : 'financeiro',
        title   : 'Financeiro',
        type    : 'collapsable',
        icon    : 'heroicons_outline:currency-dollar',
        children: [
            {
                id      : 'contasPagar',
                title   : 'Contas a Pagar',
                type    : 'basic',
                link    : '/contas-pagar'
            },
            {
                id   : 'contasReceber',
                title: 'Contas a Receber',
                type : 'basic',
                link : '/contas-receber'
            },
            {
                id   : 'diarias',
                title: 'Diárias',
                type : 'basic',
                link : '/diarias'
            }
        ]
    },
    {
        id      : 'oficios',
        title   : 'Ofícios',
        type    : 'collapsable',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id      : 'oficiosRecebidos',
                title   : 'Ofícios Recebidos',
                type    : 'basic',
                link    : '/oficios-recebidos'
            },
            {
                id   : 'oficiosEmitidos',
                title: 'Ofícios Emitidos',
                type : 'basic',
                link : '/oficios-emitidos'
            }
        ]
    },
    {
        id   : 'aeromedico',
        title: 'Operação Aeromédicas',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/operacao-aeromedica'
    },
    {
        id      : 'suprimento',
        title   : 'Suprimento',
        type    : 'collapsable',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id      : 'itens',
                title   : 'Itens',
                type    : 'basic',
                link    : '/suprimentos'
            },
            {
                id   : 'movimentacoes',
                title: 'Movimentações',
                type : 'basic',
                link : '/suprimentos/movimentacoes'
            }
        ]
    },
    {
        id      : 'veiculos',
        title   : 'Veículos',
        type    : 'collapsable',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id      : 'listar',
                title   : 'Listar',
                type    : 'basic',
                link    : '/veiculos'
            },
            {
                id   : 'multas',
                title: 'Multas',
                type : 'basic',
                link : '/veiculos/multas'
            },
            {
                id   : 'gastos',
                title: 'Gastos',
                type : 'basic',
                link : '/veiculos/gastos'
            },
            {
                id   : 'motoristas',
                title: 'Motoristas',
                type : 'basic',
                link : '/veiculos/motoristas'
            }
        ]
    },
    {
        id      : 'configuracoes',
        title   : 'Configurações',
        type    : 'collapsable',
        icon    : 'heroicons_outline:adjustments',
        children: [
            {
                id      : 'usuarios',
                title   : 'Usuários',
                type    : 'basic',
                link    : '/usuarios'
            },
            {
                id   : 'dadosCadastrais',
                title: 'Dados Cadastrais',
                type : 'basic',
                link : '/dados-cadastrais'
            },
            {
                id   : 'backup',
                title: 'Backup',
                type : 'basic',
                link : '/backup'
            }
        ]
    }
];




export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
