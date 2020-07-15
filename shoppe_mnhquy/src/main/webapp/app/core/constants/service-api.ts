export const serviceAPI = {
  folk: {
    create: 'api/folk',
    getListFolk: 'api/folk?page={page}&size={size}&name={name}&status={status}',
    getInfoFolk: 'api/folk/{id}',
    getInfoFolkByName: 'api/folk/name?name={name}',
    update: '/api/folk'
  },
  bonus: {
    create: 'api/bonus',
    getListBonus: 'api/bonus?page={page}&size={size}&sort={sort}',
    getInfoBonus: 'api/bonus/{id}',
    getInfoBonusByName: 'api/bonus/name?name={name}',
    update: '/api/bonus/update',
    filter: '/api/bonus/find?page={page}&size={size}&sort={sort}&name={name}'
  },
  timesheet: {
    create: 'api/timesheet',
    getListTimesheet: 'api/timesheet?page={page}&size={size}&sort={sort}',
    getInfoTimesheet: 'api/timesheet/{id}',
    // getInfoFolkByName: 'api/folk/name?name={name}',
    update: '/api/timesheet/update',
    filter: '/api/timesheet/find?page={page}&size={size}&sort={sort}&name={name}',
    delete: '/api/timesheet/deletes'
  },
  rawData: {
    create: 'api/rawdata',
    getListRawData: 'api/rawdata?page={page}&size={size}&sort={sort}'
  },
  shift: {
    create: 'api/shift',
    getListShift: 'api/shift?page={page}&size={size}&name={name}&status={status}&sort={sort}',
    getInfoShift: 'api/shift/{id}',
    update: '/api/shift'
  },
  schedule: {
    getListSchedule: 'api/schedule?page={page}&size={size}&name={name}',
    create: 'api/schedule',
    update: '/api/schedule',
    getInfoSchedule: 'api/schedule/{id}'
  }
};
