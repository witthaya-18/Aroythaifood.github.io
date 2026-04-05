export type MenuItem = {
  name: string;
  price: number;
  desc: string;
  img: string;
};

export type MenuSection = {
  section: string;
  items: MenuItem[];
};

export type EditableMenuItem = MenuItem & {
  section: string;
};

export type MenuFormValues = {
  name: string;
  desc: string;
  price: string;
  section: string;
  img: string;
};
