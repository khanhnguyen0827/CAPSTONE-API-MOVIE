import bannerService from '../services/banner.service.js';
import { successResponse, errorResponse } from '../common/helpers/response.helper.js';

const getBanners = async (req, res) => {
  try {
    const result = await bannerService.getBanners();

    if (result.success) {
      return successResponse(res, result.message, result.data);
    } else {
      return errorResponse(res, result.message, result.statusCode);
    }
  } catch (error) {
    console.error('Get banners controller error:', error);
    return errorResponse(res, 'Lỗi lấy danh sách banner', 500);
  }
};

export {
  getBanners
};
