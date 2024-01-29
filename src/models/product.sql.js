
// 작품 존재 확인
export const confirmProductIdSql = "SELECT EXISTS(SELECT 1 FROM product WHERE productId = ?) as isExistproductId";
export const isExistProduct = "SELECT product_id FROM product WHERE product_id = ?";
export const countProduct = "SELECT product_id as productCursor from product order by product_id DESC limit 1;";

// 작품 등록(추가)
export const insertProductSql = "INSERT INTO product ( "+
"product_name, product_author_id, product_author_nickname, product_delivery, product_price, "+
"product_description, product_hashtag, product_consumer_id, p_img" +
") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";

// 작품 조회
export const getProductIdSql = "SELECT * FROM product WHERE product_id = ?";

// 작품 id에 해당하는 카테고리 조회
export const getCategoryIdSql = "SELECT pc.pc_id, pc.pc_product_id, pc.pc_category_id, pcl.category_name " +
"FROM product_category pc join product_category_list pcl on pc.pc_category_id = pcl.category_id " +
" WHERE pc_product_id = ? and pc.pc_status = 1";
export const getCategoryItem = "SELECT pc_status FROM product_category WHERE pc_product_id = ? and pc_category_id = ?";

// 작품 정보 수정
export const updateProductInfoSql = "UPDATE product " 
+ "SET p_img = ?, product_name = ?, product_price = ?, product_delivery = ?, product_description = ?, product_hashtag = ?, updated_at = CURRENT_TIMESTAMP() " 
+ "WHERE product_id = ?;"
export const updateCategorySql = "UPDATE product_category " 
+ "SET pc_status = ?, updated_at = CURRENT_TIMESTAMP() " 
+ "WHERE pc_product_id = ? and pc_category_id = ?;"

// 작품 카테고리 및 태그 연결
export const connectProductCategorySql = "INSERT INTO product_category (pc_product_id, pc_category_id) VALUES (?, ?);";

// 작품 리스트 조회
export const selectProductList =
"SELECT * FROM product "
+"WHERE product_id < ? and product_status = 0 "
+"ORDER BY product_id DESC LIMIT ?";

// 작품 조횟수가 가장 큰
// export const countViewProductSql = "SELECT COUNT(*) as viewCount from product_list";
