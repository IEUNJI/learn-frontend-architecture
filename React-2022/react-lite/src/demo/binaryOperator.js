// 操作标识
const Placement = 0b001; // 插入
const Update = 0b010; // 更新

let flags = 0b000;

// 增加操作
flags |= Placement; // 000 | 001 = 001
flags |= Update; // 001 | 010 = 011

// 删除操作
flags = flags & ~Placement; // 011 & 110 = 010
// flags = flags & ~Update; // 010 & 101 = 000

// 判断是否包含某种操作
console.log((flags & Placement) === Placement);
console.log((flags & Update) === Update);
