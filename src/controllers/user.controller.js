const userService = require('../services/user.service');
const { successResponse, errorResponse } = require('../common/helpers/response.helper');

const getUsers = async (req, res) => {
  try {
    const result = await userService.getAllUsers();

    if (result.success) {
      return successResponse(res, result.message, result.data);
    } else {
      return errorResponse(res, result.message, result.statusCode);
    }
  } catch (error) {
    console.error('Get users controller error:', error);
    return errorResponse(res, 'Lỗi lấy danh sách người dùng', 500);
  }
};

const getUsersPaginated = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const result = await userService.getUsersPaginated(parseInt(page), parseInt(limit));

    if (result.success) {
      return successResponse(res, result.message, result.data);
    } else {
      return errorResponse(res, result.message, result.statusCode);
    }
  } catch (error) {
    console.error('Get users paginated controller error:', error);
    return errorResponse(res, 'Lỗi lấy danh sách người dùng phân trang', 500);
  }
};

const searchUsers = async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return errorResponse(res, 'Từ khóa tìm kiếm không được để trống', 400);
    }

    const result = await userService.searchUsers(keyword);

    if (result.success) {
      return successResponse(res, result.message, result.data);
    } else {
      return errorResponse(res, result.message, result.statusCode);
    }
  } catch (error) {
    console.error('Search users controller error:', error);
    return errorResponse(res, 'Lỗi tìm kiếm người dùng', 500);
  }
};

const searchUsersPaginated = async (req, res) => {
  try {
    const { keyword, page = 1, limit = 10 } = req.query;

    if (!keyword) {
      return errorResponse(res, 'Từ khóa tìm kiếm không được để trống', 400);
    }

    const result = await userService.searchUsersPaginated(keyword, parseInt(page), parseInt(limit));

    if (result.success) {
      return successResponse(res, result.message, result.data);
    } else {
      return errorResponse(res, result.message, result.statusCode);
    }
  } catch (error) {
    console.error('Search users paginated controller error:', error);
    return errorResponse(res, 'Lỗi tìm kiếm người dùng phân trang', 500);
  }
};

const getUserTypes = async (req, res) => {
  try {
    const result = await userService.getUserTypes();

    if (result.success) {
      return successResponse(res, result.message, result.data);
    } else {
      return errorResponse(res, result.message, result.statusCode);
    }
  } catch (error) {
    console.error('Get user types controller error:', error);
    return errorResponse(res, 'Lỗi lấy danh sách loại người dùng', 500);
  }
};

const getUserById = async (req, res) => {
  try {
    const { taiKhoan } = req.body;

    const result = await userService.getUserById(taiKhoan);

    if (result.success) {
      return successResponse(res, result.message, result.data);
    } else {
      return errorResponse(res, result.message, result.statusCode);
    }
  } catch (error) {
    console.error('Get user by ID controller error:', error);
    return errorResponse(res, 'Lỗi lấy thông tin người dùng', 500);
  }
};

const createUser = async (req, res) => {
  try {
    const userData = req.body;

    const result = await userService.createUser(userData);

    if (result.success) {
      return successResponse(res, result.message, result.data, 201);
    } else {
      return errorResponse(res, result.message, result.statusCode);
    }
  } catch (error) {
    console.error('Create user controller error:', error);
    return errorResponse(res, 'Lỗi thêm người dùng', 500);
  }
};

const updateUser = async (req, res) => {
  try {
    const { taiKhoan, ...userData } = req.body;

    const result = await userService.updateUser(taiKhoan, userData);

    if (result.success) {
      return successResponse(res, result.message, result.data);
    } else {
      return errorResponse(res, result.message, result.statusCode);
    }
  } catch (error) {
    console.error('Update user controller error:', error);
    return errorResponse(res, 'Lỗi cập nhật thông tin người dùng', 500);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { taiKhoan } = req.body;

    const result = await userService.deleteUser(taiKhoan);

    if (result.success) {
      return successResponse(res, result.message);
    } else {
      return errorResponse(res, result.message, result.statusCode);
    }
  } catch (error) {
    console.error('Delete user controller error:', error);
    return errorResponse(res, 'Lỗi xóa người dùng', 500);
  }
};

module.exports = {
  getUsers,
  getUsersPaginated,
  searchUsers,
  searchUsersPaginated,
  getUserTypes,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
