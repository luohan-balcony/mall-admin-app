const roleToRouter = {
  coustomer: [{
    name: 'Product',
  }, {
    name: 'ProductList',
  }, {
    name: 'ProductAdd',
  }, {
    name: 'ProductEdit',
  }],
  admin: [{
    name: 'Product',
  }, {
    name: 'ProductList',
  }, {
    name: 'ProductAdd',
  }, {
    name: 'Category',
  }, {
    name: 'ProductEdit',
  }],
};

/**
 * 过滤掉没有权限的路由
 * @param {String} role
 * @param {Array} routes
 */
export default function getMenuRouter(role, routes) {
  const allowRoutesName = roleToRouter[role].map((item) => item.name);
  console.log(allowRoutesName);
  const resultRoutes = routes.filter((r) => {
    const obj = r;
    if (allowRoutesName.indexOf(obj.name) !== -1) {
      const { children } = obj;
      obj.children = children.filter((c) => allowRoutesName.indexOf(c.name) !== -1);
      return true;
    }
    return false;
  });
  return resultRoutes;
}
