import MenuItem from "./entities/menu-item.entity";
export class MenuItemsService {
  async getMenuItems() {
    const menuItems = await MenuItem.findAll();
    const data = menuItems.map((menuItem) => menuItem.get());
    const topLevel = data.find((menuItem) => menuItem.parentId == null);
    this.hierarchize(topLevel, data);
    return [topLevel];
  }

  hierarchize(parent: any, list: any[]) {
    const children = list.filter((x) => x.parentId == parent.id);
    children.forEach((child) => this.hierarchize(child, list));
    if (children?.length) parent.children = children;
  }
}
