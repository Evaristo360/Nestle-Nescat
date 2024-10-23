import { messages } from './AppSidebarMessages';
import { createIntl, createIntlCache } from 'react-intl';
import { translations } from 'translations';
import { config } from 'providers/config';
import { roles } from 'providers/role';
import { Sidebar } from 'assets';
import { permissions }  from 'providers/permission';

const language = translations[config.siteConfig.languageCode];
const languageCode = config.siteConfig.languageCode;

const cache = createIntlCache();
const intlExt = createIntl({ locale: languageCode, messages: language }, cache);

const createGroup = (label = '', items = []) => ({
  label,
  items
});
const createSection = (label, icon, route) => ({ label, icon, route });

const sections = {
  analytics: createSection('Analytics', Sidebar.AnalyticsIcon, '/nestle/analytics'),
  digitalDisplay: createSection(
    'Digital Display',
    Sidebar.DigitalDisplayIcon,
    '/digital-display/status'
  ),
  totem: createSection('Tótem', Sidebar.TotemIcon, '/totem/status'),
  branchOffices: createSection(
    'Sucursales',
    Sidebar.BranchOfficesIcon,
    '/branch-offices/list'
  ),
  products: createSection('Productos', Sidebar.ProductsIcon, '/product/list'),
  load_points: createSection('Carga de puntos', Sidebar.LoadPointsIcon, '/load-points/list'),
  clients: createSection('Clientes', Sidebar.ClientsIcon, '/clients/list'),
  purchase_request: createSection(
    'Solicitudes de compra',
    Sidebar.PurchaseRequestIcon,
    '/purchase-requisitions/list'
  ),
  promotions: createSection('Promociones', Sidebar.PromotionsIcon, '/promotions/list'),
  redemptionOfPoints: createSection(
    'Canjeo de puntos',
    Sidebar.RedemptionOfPointsIcon,
    '/redemption-points/list'
  ),
  consumers: createSection('Compradores', Sidebar.ConsumersIcon, '/customer/list'),
  globalInteraction: createSection(
    'Interacciones globales',
    Sidebar.GlobalInteractionsIcon,
    ''
  ),
  users: createSection('Usuarios', Sidebar.UsersIcon, '/users/list'),
  resolutions: createSection(
    'Resoluciones',
    Sidebar.ResolutionsIcon,
    '/resolutions/list'
  ),
  scenes: createSection('Escenas', Sidebar.ScenesIcon, '/scenes/list'),
  campaigns: createSection(
    'Campañas',
    Sidebar.CampaignsIcon,
    '/campaigns/list'
  ),
  screens: createSection('Pantallas', Sidebar.ScreensIcon, '/screens/list'),
  events: createSection(
    'Programación de eventos',
    Sidebar.EventsIcon,
    '/calendar'
  ),
  adAnalytics: createSection('Analytics', Sidebar.AdAnalyticsIcon, '/analytics')
};

export const createSidebarSections = (role, perms) => {
  let groups = {
    general: createGroup('', []),
    clients: createGroup('Cuentas', []),
    management: createGroup('Gestión', []),
    advertisement: createGroup('Publicidad', [])
  };

  if (perms.includes(permissions.analytics)) {
    groups.general.items.push(sections.analytics);
  }

  if (perms.includes(permissions.digital_display)) {
    groups.management.items.push(sections.digitalDisplay);
  }

  if (perms.includes(permissions.totem)) {
    groups.management.items.push(sections.totem);
  }

  if (perms.includes(permissions.client_module)) {
    groups.management.items.push(sections.clients);
  }

  if (perms.includes(permissions.branches)) {
    groups.management.items.push(sections.branchOffices);
  }

  if (perms.includes(permissions.product)) {
    groups.management.items.push(sections.products);
  }

  if (perms.includes(permissions.redemption_pts)) {
    groups.management.items.push(sections.redemptionOfPoints);
  }

  if (perms.includes(permissions.load_pts)) {
    groups.management.items.push(sections.load_points);
  }

  if (perms.includes(permissions.customer)) {
    groups.management.items.push(sections.consumers);
  }

  if (perms.includes(permissions.purchase_request)) {
    groups.management.items.push(sections.purchase_request);
  }

  if (perms.includes(permissions.sale_off)) {
    groups.management.items.push(sections.promotions);
  }

  if (perms.includes(permissions.management)) {
    groups.management.items.push(sections.users);
  }

  if (perms.includes(permissions.advertisement)) {
    groups.advertisement.items.push(sections.resolutions);
    groups.advertisement.items.push(sections.scenes);
    groups.advertisement.items.push(sections.campaigns);
    groups.advertisement.items.push(sections.screens);
    groups.advertisement.items.push(sections.events);
    groups.advertisement.items.push(sections.adAnalytics);
  }

  return groups;
};
