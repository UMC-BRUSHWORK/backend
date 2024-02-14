
// 작품 존재 확인
export const confirmProductIdSql = "SELECT EXISTS(SELECT 1 FROM product WHERE productId = ?) as isExistproductId";
export const isExistProduct = "SELECT product_id FROM product WHERE product_id = ?";
export const countProduct = "SELECT product_id as productCursor from product order by product_id DESC limit 1;";

// 작품 등록(추가)
export const addProductSql = "INSERT INTO product ( "+
"product_name, product_author_id, product_author_nickname, product_delivery, product_price, "+
"product_description, product_hashtag, product_consumer_id, p_img, product_preview_img" +
") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

// 작품 조회
export const getProductIdSql = "SELECT * FROM product WHERE product_id = ?";

// 작품 id에 해당하는 카테고리 조회
export const getCategoryIdSql = "SELECT pc.pc_id, pc.pc_product_id, pc.pc_category_id, pcl.category_name " +
"FROM product_category pc join product_category_list pcl on pc.pc_category_id = pcl.category_id " +
" WHERE pc_product_id = ? and pc.pc_status = 1";
export const getCategoryItem = "SELECT pc_status FROM product_category WHERE pc_product_id = ? and pc_category_id = ?";

// 검색 - 비로그인
export const getKeywordTitleSql = "SELECT product_id, product_name, product_author_id, product_author_nickname, product_status, product_hashtag, product_preview_img FROM product WHERE product_name LIKE ? and product_id < ? ORDER BY product_id DESC LIMIT ?";
export const getKeywordDescriptionSql = "SELECT product_id, product_name, product_author_id, product_author_nickname, product_status, product_hashtag, product_preview_img FROM product WHERE product_description LIKE ? and product_id < ? ORDER BY product_id DESC LIMIT ?";
export const getKeywordHashtagSql = "SELECT product_id, product_name, product_author_id, product_author_nickname, product_status, product_hashtag, product_preview_img FROM product WHERE product_hashtag LIKE ? and product_id < ? ORDER BY product_id DESC LIMIT ?";

export const getKeywordAuthorSql = "SELECT product_id, product_name, product_author_id, product_author_nickname, product_status, product_hashtag, product_preview_img FROM product WHERE product_author_nickname LIKE ? and product_id < ? ORDER BY product_id DESC LIMIT ?";

// 검색 - 로그인
export const getKeywordTitleToAuthSql = "SELECT product_id, product_name, product_author_id, product_author_nickname, product_status, product_hashtag, product_preview_img, IFNULL(fp.favor_status, 0) as favorStatus FROM product left join favor_product fp on fp.favor_product_id = product_id and fp.favor_user_id = ? WHERE product_name LIKE ? and product_id < ? ORDER BY product_id DESC LIMIT ?";
export const getKeywordDescriptionAuthSql = "SELECT product_id, product_name, product_author_id, product_author_nickname, product_status, product_hashtag, product_preview_img, IFNULL(fp.favor_status, 0) as favorStatus FROM product left join favor_product fp on fp.favor_product_id = product_id and fp.favor_user_id = ? WHERE product_description LIKE ? and product_id < ? ORDER BY product_id DESC LIMIT ?";
export const getKeywordHashtagAuthSql = "SELECT product_id, product_name, product_author_id, product_author_nickname, product_status, product_hashtag, product_preview_img, IFNULL(fp.favor_status, 0) as favorStatus FROM product left join favor_product fp on fp.favor_product_id = product_id and fp.favor_user_id = ? WHERE product_hashtag LIKE ? and product_id < ? ORDER BY product_id DESC LIMIT ?";

export const getKeywordAuthorAuthSql = "SELECT product_id, product_name, product_author_id, product_author_nickname, product_status, product_hashtag, product_preview_img, IFNULL(fp.favor_status, 0) as favorStatus FROM product left join favor_product fp on fp.favor_product_id = product_id and fp.favor_user_id = ? WHERE product_author_nickname LIKE ? and product_id < ? ORDER BY product_id DESC LIMIT ?";

// 작품 정보 수정
export const updateProductInfoSql = "UPDATE product " 
+ "SET p_img = ?, product_name = ?, product_price = ?, product_delivery = ?, product_description = ?, product_hashtag = ?, updated_at = CURRENT_TIMESTAMP() " 
+ "WHERE product_id = ?;"
export const updateCategorySql = "UPDATE product_category " 
+ "SET pc_status = ?, updated_at = CURRENT_TIMESTAMP() " 
+ "WHERE pc_product_id = ? and pc_category_id = ?;"

// 작품 카테고리 및 태그 연결
export const connectProductCategorySql = "INSERT INTO pc_id (pc_category_id, product_id) VALUES (?, ?);";
export const connectProductTagSql = "INSERT INTO pt_id (pc_tag_id, product_id) VALUES (?, ?);";

// 작품 수요 조회
export const getFavorCountSql = "SELECT COUNT(*) AS favor_count FROM product WHERE product_id = ?";


export const updateProductDealSql = "UPDATE product SET product_consumer_id = ?, product_status = 1, updated_at = CURRENT_TIMESTAMP WHERE product_id = ?; ";

export const insertSalesSql = "INSERT INTO sales (sales_product_id, sales_consumer_id, sales_author_id) values (?, ?, ?);"