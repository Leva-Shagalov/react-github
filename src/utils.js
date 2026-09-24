const filterCallBacks = {
  all: () => true,
  overdue: ({ due_date }) =>
    typeof due_date === "string" && due_date < new Date().toISOString(),
  today: ({ due_date }) =>
    typeof due_date === "string" &&
    due_date.slice(0, 10) === new Date().toISOString().slice(0, 10),
  favorites: ({ is_favorite }) => is_favorite === true,
  repeating: ({ repeating_days }) =>
    Object.values(repeating_days).some((day) => day === true),
  archive: ({ is_archived }) => is_archived === true,
};

const sortedCallBacks = {
  "SORT BY DEFAULT": undefined,
  "SORT BY DATE up": (a, b) => {
    const dateA = new Date(a.due_date);
    const dateB = new Date(b.due_date);
    return dateA - dateB;
  },
  "SORT BY DATE down": (a, b) => {
    const dateA = new Date(a.due_date);
    const dateB = new Date(b.due_date);
    return dateB - dateA;
  },
};

const filters = [
  {
    id: crypto.randomUUID(),
    filterType: "all",
    disabled: false,
    checked: false,
    count: 0,
  },
  {
    id: crypto.randomUUID(),
    filterType: "overdue",
    disabled: false,
    checked: false,
    count: 0,
  },
  {
    id: crypto.randomUUID(),
    filterType: "today",
    disabled: false,
    checked: false,
    count: 0,
  },
  {
    id: crypto.randomUUID(),
    filterType: "favorites",
    disabled: false,
    checked: false,
    count: 0,
  },
  {
    id: crypto.randomUUID(),
    filterType: "repeating",
    disabled: false,
    checked: false,
    count: 0,
  },
  {
    id: crypto.randomUUID(),
    filterType: "archive",
    disabled: false,
    checked: false,
    count: 0,
  },
];

export { filterCallBacks, sortedCallBacks, filters };
