import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: ''
  },
  {
    title: true,
    name: 'Danh sách quản lí'
  },
  {
    name: 'Dân tộc',
    url: '/folk',
    authorities: ['ROLE_USER'],
    icon: 'fa fa-users'
  },
  {
    name: 'Dữ liệu thô',
    url: '/raw-data',
    authorities: ['ROLE_USER'],
    icon: 'fa fa-users'
  },
  {
    name: 'Thời gian biểu',
    url: '/timesheet',
    authorities: ['ROLE_USER'],
    icon: 'fa fa-users'
  },
  {
    name: 'Ưu đãi giờ làm',
    url: '/bonus',
    authorities: ['ROLE_USER'],
    icon: 'fa fa-users'
  },
  {
    name: 'Ca',
    url: '/shift',
    authorities: ['ROLE_USER'],
    icon: 'fa fa-users'
  },
  {
    name: 'Lịch trình',
    url: '/schedule',
    authorities: ['ROLE_USER'],
    icon: 'fa fa-users'
  },
  {
    name: 'Công ty',
    url: '/company',
    authorities: ['ROLE_ADMIN'],
    icon: 'fa fa-building'
  },
  {
    name: 'Phòng Ban',
    url: '/department',
    authorities: ['ROLE_USER'],
    icon: 'fa fa-columns'
  },
  {
    name: 'Nhân viên',
    url: '/employee',
    authorities: ['ROLE_USER'],
    icon: 'fa fa-users'
  },
  {
    name: 'Đơn vị',
    url: '/position',
    authorities: ['ROLE_USER'],
    icon: 'icon-cursor'
  },
  {
    name: 'Người dùng',
    url: '/user',
    authorities: ['ROLE_ADMIN'],
    icon: 'fas fa-user'
  },
  {
    divider: true
  }
];
