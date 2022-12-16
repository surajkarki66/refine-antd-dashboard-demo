import { newModel, StringAdapter } from "casbin";

export const model = newModel(`
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act, eft

[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow)) && !some(where (p.eft == deny))

[matchers]
m = g(r.sub, p.sub) && keyMatch(r.obj, p.obj) && regexMatch(r.act, p.act)
`);

export const adapter = new StringAdapter(`
p, admin, dashboard, list

p, admin, todos, (list)|(create)
p, admin, todos/*, (edit)|(show)|(delete)
p, admin, todos/*, field

p, admin, users, (list)|(create)
p, admin, users/*, (edit)|(show)|(delete)

p, admin, subtasks, (list)|(create)
p, admin, subtasks/*, (edit)|(show)|(delete)
p, admin, subtasks/*, field

p, editor, dashboard, list

p, editor, todos, (list)|(create)
p, editor, todos/*, (edit)|(show)

p, editor, subtasks, (list)|(create)
p, editor, subtasks/*, (edit)|(show)

p, editor, users, list

`);
