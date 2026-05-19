export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  url?: string;
  icon?: string;
}

export interface TableColumn {
  field: string;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
}
