// 작품 등록(추가)
export const insertProductSql = "INSERT INTO product (product_id, p_img, product_name, product_price, product_delivery, product_description, created_at) VALUES (?, ?, ?, ?, ?, ?, ?);";

// 작품 
export const getProductId = "SELECT * FROM product WHERE product_id = ?";

// 작품 카테고리 연결
export const connectProductCategory = "INSERT INTO pc_id (pc_category_id, product_id) VALUES (?, ?);";

// 작품 태그 연결
export const connectProductTag = "INSERT INTO pc_id (pc_category_id, product_id) VALUES (?, ?);";

// 작품 존재 확인
export const confirmProductId = "SELECT EXISTS(SELECT 1 FROM product WHERE productId = ?) as isExistproductId";

// 작품 카테고리 매핑
export const getCategoryToProductId =
"SELECT ufc.uf_category_id, ufc.pc_category_id, ufc.product_id, fcl.f_category_name "
+ "FROM pc_id ufc JOIN food_category_list fcl on ufc.pc_category_id = fcl.pc_category_id "
+ "WHERE ufc.product_id = ? ORDER BY ufc.pc_category_id ASC;";

// 작품 태그 매핑
export const getTagToProductId =
"SELECT ufc.uf_tag_id, ufc.pc_tag_id, ufc.product_id, fcl.f_tag_name "
+ "FROM pc_id ufc JOIN food_tag_list fcl on ufc.pc_tag_id = fcl.pc_tag_id "
+ "WHERE ufc.product_id = ? ORDER BY ufc.pc_tag_id ASC;";