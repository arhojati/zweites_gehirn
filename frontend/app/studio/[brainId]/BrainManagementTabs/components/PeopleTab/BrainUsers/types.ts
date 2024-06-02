export const roles = ["Viewer", "Editor", "Owner"] as const;

export type BrainRoleType = (typeof roles)[number];

export type BrainRoleAssignation = {
  email: string;
  role: BrainRoleType;
  id: string;
};

export type SelectOptionsProps = {
  label: string;
  value: BrainRoleType;
};
export const availableRoles: SelectOptionsProps[] = [
  { label: "Betrachter", value: "Viewer" },
  { label: "Editor", value: "Editor" },
  { label: "Eigentümer", value: "Owner" },
];

export const userRoleToAssignableRoles: Record<
  BrainRoleType,
  SelectOptionsProps[]
> = {
  Viewer: [],
  Editor: [
    { label: "Betrachter", value: "Viewer" },
    { label: "Editor", value: "Editor" },
  ],

  Owner: [
    { label: "Betrachter", value: "Viewer" },
    { label: "Editor", value: "Editor" },
    { label: "Eigentümer", value: "Owner" },
  ],
};
