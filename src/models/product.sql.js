
// 작품 존재 확인
export const confirmProductIdSql = "SELECT EXISTS(SELECT 1 FROM product WHERE productId = ?) as isExistproductId";

// 작품 등록(추가)
export const insertProductSql = "INSERT INTO product (product_id, p_img, product_name, product_price, product_delivery, product_description, created_at) VALUES (?, ?, ?, ?, ?, ?, ?);";

// 작품 조회
export const getProductIdSql = "SELECT * FROM product WHERE product_id = ?";
export const getCategoryIdSql = "SELECT * FROM product WHERE pc_category_id = ?";
export const getTagIdSql = "SELECT * FROM product WHERE pc_tag_id = ?";

// 작품 정보 수정
export const updateProductInfoSql = 
"UPDATE product" 
+ "SET p_img = ?, product_name = ?, product_price = ?, product_delivery = ?, product_descript = ?, updated_at = CURRENT_TIMESTAMP() " 
+ "WHERE product_id = ?;"

// 작품 카테고리 및 태그 연결
export const connectProductCategorySql = "INSERT INTO pc_id (pc_category_id, product_id) VALUES (?, ?);";
export const connectProductTagSql = "INSERT INTO pt_id (pc_tag_id, product_id) VALUES (?, ?);";

// 작품 조횟수가 가장 큰
// export const countViewProductSql = "SELECT COUNT(*) as viewCount from product_list";
