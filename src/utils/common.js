import { useLocation } from "react-router-dom";
import {
  PieChart as PieChartIcon,
  Users as UsersIcon,
  Calendar as CalendarIcon,
  ShoppingCart as ShoppingCartIcon,
  Trello as TrelloIcon

} from 'react-feather';
import useAuth from 'src/hooks/useAuth';

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const tabs = [
  {
    value: 'all',
    label: 'All'
  }
];

export const sortOptions = [
  {
    value: 'created_date|desc',
    label: 'Newest First'
  },
  {
    value: 'created_date|asc',
    label: 'Oldest First'
  },
  {
    value: 'name|asc',
    label: 'Name A-Z'
  },
  {
    value: 'name|desc',
    label: 'Name Z-A'
  }
];

export const applyFilters = (list_object, query, filters, properties) => {
  return list_object.filter((selectedobject) => {
    let matches = true;

    if (query) {
      let properties = ['name'];
      let containsQuery = false;

      properties.forEach((property) => {
        if (selectedobject[property].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });

      if (!containsQuery) {
        matches = false;
      }
    }

    Object.keys(filters).forEach((key) => {
      const value = filters[key];

      if (value && selectedobject[key] !== value) {
        matches = false;
      }
    });

    return matches;
  });
};

export const applyFiltersLeaderboard = (list_object, query, filters, properties) => {
  return list_object.filter((selectedobject) => {
    let matches = true;

    if (query) {
      let properties = ['exhibitor__name', 'visitor__first_name', 'visitor__last_name'];
      let containsQuery = false;

      properties.forEach((property) => {
        if (selectedobject[property].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });

      if (!containsQuery) {
        matches = false;
      }
    }

    Object.keys(filters).forEach((key) => {
      const value = filters[key];

      if (value && selectedobject[key] !== value) {
        matches = false;
      }
    });

    return matches;
  });
};

export const applyPagination = (list_objects, page, limit) => {
  return list_objects.slice(page * limit, page * limit + limit);
};


export const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
};

export const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

export const applySort = (list_objects, sort) => {
  const [orderBy, order] = sort.split('|');
  const comparator = getComparator(order, orderBy);
  const stabilizedThis = list_objects.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);

    if (order !== 0) return order;

    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
};

export const Fields_access = (pagenamefields) => {
  const { userfields } = useAuth();
  let returnvalue = false;
  if (userfields !== null && userfields.length > 0) {
    let data = userfields.find((_fields) => _fields.entity_text === pagenamefields);
    if (data !== undefined && data !== null) {
      returnvalue = true;
    }
  }
  return returnvalue
}

export const Getmenu = (usermenu) => {
  let sections = [];
  let items = [];
  var data = {};
  data['subheader'] = 'Management';
  Object.keys(usermenu).forEach((key) => {
    let int_data = {}
    const value = usermenu[key];
    if (value.entity_text === "dashboard") {
      int_data = {
        subheader: 'Reports',
        items: [
          {
            title: 'Dashboard',
            icon: PieChartIcon,
            href: '/app/dashboard'
          },
        ]
      }
      sections.push(int_data)
    }
    if (value.entity_text === "organizer") {
      int_data = {
        title: 'Organizers',
        icon: UsersIcon,
        href: '/app/management/organizers',
        items: [
          {
            title: 'List Organizers',
            href: '/app/management/organizers'
          },
          {
            title: 'Create Organizer',
            href: '/app/management/organizers/create'
          },
        ]
      }
      items.push(int_data)
    }
    if (value.entity_text === "speaker") {
      int_data = {
        title: 'Speakers',
        icon: UsersIcon,
        href: '/app/management/speaker',
        items: [
          {
            title: 'List Speakers',
            href: '/app/management/speaker'
          },
          {
            title: 'Create Speaker',
            href: '/app/management/speaker/create'
          },
        ]
      }
      items.push(int_data)
    }
    else if (value.entity_text === "events") {
      int_data = {
        title: 'Events',
        icon: CalendarIcon,
        href: '/app/management/events',
        items: [
          {
            title: 'List Events',
            href: '/app/management/events'
          },
          {
            title: 'Create Event',
            href: '/app/management/events/create'
          },
          {
            title: 'My Events',
            href: '/app/management/events/myevents'
          },
        ]
      }

      items.push(int_data)
    }
    else if (value.entity_text === "exhibitor") {
      int_data = {
        title: 'Exhibitors',
        icon: UsersIcon,
        href: '/app/management/exhibitors',
        items: [
          {
            title: 'List Exhibitors',
            href: '/app/management/exhibitors'
          },
          {
            title: 'Create Exhibitor',
            href: '/app/management/exhibitors/create'
          },
          {
            title: 'Staff',
            href: '/app/management/exhibitorstaff',
            icon: UsersIcon,
            items: [
              {
                title: 'List Staffs',
                href: '/app/management/exhibitorstaff'
              },
              {
                title: 'Create Staff',
                href: '/app/management/exhibitorstaff/create'
              }
            ]
          },
          {
            title: 'Product',
            href: '/app/management/exhibitorproduct',
            icon: ShoppingCartIcon,
            items: [
              {
                title: 'List Products',
                href: '/app/management/exhibitorproduct'
              },
              {
                title: 'Create Product',
                href: '/app/management/exhibitorproduct/create'
              }
            ]
          },

        ]
      }
      items.push(int_data)
    }
    else if (value.entity_text === "exhibitordetail") {
      int_data = {
        title: 'Exhibitor Details',
        icon: UsersIcon,
        items: [
          {
            title: 'Staff',
            href: '/app/management/exhibitorstaff',
            icon: UsersIcon,
            items: [
              {
                title: 'List Staffs',
                href: '/app/management/exhibitorstaff'
              },
              {
                title: 'Create Staff',
                href: '/app/management/exhibitorstaff/create'
              }
            ]
          },
          {
            title: 'Product',
            href: '/app/management/exhibitorproduct',
            icon: ShoppingCartIcon,
            items: [
              {
                title: 'List Products',
                href: '/app/management/exhibitorproduct'
              },
              {
                title: 'Create Product',
                href: '/app/management/exhibitorproduct/create'
              }
            ]
          },

        ]
      }
      items.push(int_data)
    }
    else if (value.entity_text === "assets") {
      int_data = {
        title: 'Assets',
        icon: CalendarIcon,
        href: '/app/management/assets',
        items: [
          {
            title: 'List Assets',
            href: '/app/management/assets'
          },
          {
            title: 'Create Assets',
            href: '/app/management/assets/create'
          },
        ]
      }

      items.push(int_data)
    }

    else if (value.entity_text === "enquiry") {
      int_data = {
        title: 'Enquiry',
        icon: TrelloIcon,
        href: '/app/management/enquiry',
      }

      items.push(int_data)
    }

  });
  if (items.length > 0) {
    data['items'] = items;
    sections.push(data)
  }
  return sections;
}
export const filestackoptionimage = {
  accept: 'image/*',
}
export const filestackoptionpdf = {
  accept: ['application/pdf', "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]
}
export const initAuth = () => {
  return window.gapi.auth2.init({
    client_id: "145715650542-timtp45qrtka5gn2ac03eetnv1tefvbg.apps.googleusercontent.com", //paste your client ID here
    scope: "https://www.googleapis.com/auth/analytics.readonly",
  });
};

