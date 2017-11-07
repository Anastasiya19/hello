//Project name - Sagarmatha

//Database URL
exports.URL = process.env.database_url

//AWS details
exports.awsId = process.env.awsId
exports.awsSecret = process.env.awsSecret
exports.awsTag = process.env.awsTag

//Flipkart affiliate details
exports.fk_affiliate_id = process.env.fk_affiliate_id;
exports.fk_affiliate_token = process.env.fk_affiliate_token;

//API AI Bearer Token
exports.api_ai_developer_access_token = process.env.api_ai_developer_access_token;
exports.api_ai_client_access_token = process.env.api_ai_client_access_token;
exports.api_ai_request_url = 'https://api.api.ai/v1/query?v=20150910';

//API AI Intent IDs
exports.specifications_intent_id = "90b1d779-2e69-4e96-853e-49387b439886";
exports.comparison_intent_id = "ac3bf2d2-f66f-4893-95cc-fa307d61f4e6";
exports.suggestion_intent_id = "f18faa4f-a085-48a8-918b-c6b101252de6";

exports.specifications_followup = "ee27ea42-e2df-47dd-8e3a-633a86ab153c";
exports.comparison_followup = "effe1270-5f94-49f3-b96e-431c5d7706c2";