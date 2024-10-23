import { permissions } from 'providers/permission';
import { NestleAnalytics } from 'views/NestleAnalytics';
import { UserCreate } from 'views/Users/UserCreate/index';
import { UserEdit } from 'views/Users/UserEdit';
import UsersList from 'views/Users/UsersList';
import { Calendars } from 'views/Calendar/Calendars';
import { AnalyticsList } from 'views/Analytics';
import { ResolutionsList } from 'views/Resolutions/ResolutionsList';
import { SceneDesign, SceneList } from 'views/Scenes';

import {
  CampaignCreate,
  CampaignsList,
  CampaignPreview
} from 'views/Campaigns';
import { ClientsList } from 'views/Clients/ClientsList';
import { ScreensList } from 'views/Screens';
import { DigitalDisplayStatus, DigitalDisplayList } from 'views/DigitalDisplay';
import { ProductList } from 'views/Products';
import {
  BranchOfficesList,
  BranchProductsList,
  BranchExchangeList
} from 'views/BranchOffices';
import { CustomerList } from 'views/Customer';
import { PinCoincidence } from 'views/Customer/PinCoincidence';

import {
  RedemptionOfPointsList,
  RedemptionOfPointsReport
} from 'views/RedemptionOfPoints';

import {
  LoadPointsList,
  PendingRequestList,
  PendingRequestForm
} from 'views/LoadPoints';
import { PurchaseRequisitionsList } from 'views/PurchaseRequisitions';
import { PromotionList } from 'views/Promotions';
import { DetectionRecords } from 'views/NestleAnalytics/DetectionRecords';
import { TotemStatus, TotemList } from 'views/Totem';

export const routes = [
  {
    path: '/nestle/analytics',
    component: NestleAnalytics,
    perm: permissions.analytics
  },
  {
    path: '/nestle/analytics/detection_records',
    component: DetectionRecords,
    perm: permissions.analytics
  },
  { path: '/user/create', component: UserCreate, perm: permissions.management },
  { path: '/user/edit/:id', component: UserEdit, perm: permissions.management },
  { path: '/users/list', component: UsersList, perm: permissions.management },

  {
    path: '/scenes/list',
    component: SceneList,
    perm: permissions.advertisement
  },
  {
    path: '/scenes/design/:id',
    component: SceneDesign,
    perm: permissions.advertisement
  },

  { path: '/calendar', component: Calendars, perm: permissions.advertisement },
  {
    path: '/analytics',
    component: AnalyticsList,
    perm: permissions.analytics
  },
  {
    path: '/resolutions/list',
    component: ResolutionsList,
    perm: permissions.advertisement
  },

  {
    path: '/campaigns/list',
    component: CampaignsList,
    perm: permissions.advertisement
  },
  {
    path: '/campaign/create',
    component: CampaignCreate,
    perm: permissions.advertisement
  },
  {
    path: '/campaign/edit/:id',
    component: CampaignCreate,
    perm: permissions.advertisement
  },
  {
    path: '/campaign/preview/:id',
    component: CampaignPreview,
    perm: permissions.advertisement
  },

  {
    path: '/clients/list',
    component: ClientsList,
    perm: permissions.client_module
  },
  {
    path: '/screens/list',
    component: ScreensList,
    perm: permissions.advertisement
  },
  {
    path: '/digital-display/list',
    component: DigitalDisplayList,
    perm: permissions.digital_display
  },
  {
    path: '/digital-display/status',
    component: DigitalDisplayStatus,
    perm: permissions.digital_display
  },
  { path: '/product/list', component: ProductList, perm: permissions.product },

  {
    path: '/branch-offices/list',
    component: BranchOfficesList,
    perm: permissions.branches
  },
  {
    path: '/branch-offices/products/:id',
    component: BranchProductsList,
    perm: permissions.branches
  },
  {
    path: '/branch-offices/exchange/:id',
    component: BranchExchangeList,
    perm: permissions.branches
  },

  {
    path: '/redemption-points/list',
    component: RedemptionOfPointsList,
    perm: permissions.redemption_pts
  },
  {
    path: '/customer/list',
    component: CustomerList,
    perm: permissions.customer
  },
  {
    path: '/customer/pin/:id',
    component: PinCoincidence,
    perm: permissions.customer
  },
  {
    path: '/redemption-points/report',
    component: RedemptionOfPointsReport,
    perm: permissions.redemption_pts
  },

  {
    path: '/load-points/list',
    component: LoadPointsList,
    perm: permissions.load_pts
  },
  {
    path: '/load-points/pending-request/list',
    component: PendingRequestList,
    perm: permissions.load_pts
  },
  {
    path: '/load-points/pending-request/:id',
    component: PendingRequestForm,
    perm: permissions.branches
  },
  {
    path: '/purchase-requisitions/list',
    component: PurchaseRequisitionsList,
    perm: permissions.purchase_request
  },
  {
    path: '/promotions/list',
    component: PromotionList,
    perm: permissions.sale_off
  },
  {
    path: '/totem/list',
    component: TotemList,
    perm: permissions.totem
  },
  {
    path: '/totem/status',
    component: TotemStatus,
    perm: permissions.totem
  },
];
