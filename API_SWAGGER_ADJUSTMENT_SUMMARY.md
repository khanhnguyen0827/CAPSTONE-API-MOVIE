# API and Swagger Interface Adjustment Summary

## Overview
Successfully adjusted the booking API and Swagger interface to match the exact requirements shown in the Swagger UI image, including the required headers and request structure.

## Key Changes Made

### 1. Updated Swagger Configuration
**File**: `src/common/swagger/swagger.config.js`

#### Added TokenCybersoft Security Scheme:
```javascript
TokenCybersoft: {
  type: 'apiKey',
  in: 'header',
  name: 'TokenCybersoft',
  description: 'Nhập token cybersoft'
}
```

#### Updated BookingRequest Schema:
- Removed `taiKhoan` requirement (now handled by authentication)
- Updated examples to match Swagger UI (using 0 instead of 1)
- Added proper descriptions for all fields
- Changed content type to `application/json-patch+json`

### 2. Updated Booking Router
**File**: `src/routers/booking.router.js`

#### Enhanced DatVe Endpoint Documentation:
- Added `TokenCybersoft` security requirement
- Updated content type to `application/json-patch+json`
- Referenced the updated `BookingRequest` schema
- Maintained both `BearerAuth` and `TokenCybersoft` security schemes

### 3. Created Cybersoft Token Middleware
**File**: `src/common/middlewares/cybersoft-token.middleware.js`

#### New Middleware Features:
- Validates `TokenCybersoft` header presence
- Accepts both `tokencybersoft` and `TokenCybersoft` header names
- Returns proper error messages for missing or invalid tokens
- Adds token to request object for controller use

### 4. Updated Booking Validator
**File**: `src/common/validators/booking.validator.js`

#### Changes Made:
- Removed `taiKhoan` validation (handled by authentication middleware)
- Maintained validation for `maLichChieu` and `danhSachVe`
- Kept proper error messages and validation rules

## New API Structure

### DatVe Endpoint Requirements

#### Headers Required:
1. **Authorization**: Bearer token for user authentication
2. **TokenCybersoft**: Cybersoft token for API access

#### Request Body Structure:
```json
{
  "maLichChieu": 0,
  "danhSachVe": [
    {
      "maGhe": 0,
      "giaVe": 0
    }
  ]
}
```

#### Content Type:
- `application/json-patch+json`

## Swagger Interface Updates

### Security Schemes
1. **BearerAuth**: JWT token for user authentication
   - Description: "Nhập token bearer"
   - Type: HTTP Bearer

2. **TokenCybersoft**: API key for Cybersoft access
   - Description: "Nhập token cybersoft"
   - Type: API Key in header

### Enhanced Documentation
- Clear parameter descriptions in Vietnamese
- Proper error response documentation
- Required field indicators
- Example values matching Swagger UI

## Testing Results

### ✅ Swagger Documentation
- Swagger UI accessible at `/api/v1/docs`
- TokenCybersoft security scheme properly configured
- DatVe endpoint shows both required headers
- Request body structure matches Swagger UI

### ✅ API Functionality
- Server starts successfully with new middleware
- TokenCybersoft validation working
- Proper error handling for missing tokens
- Authentication flow maintained

### ✅ Middleware Integration
- Cybersoft token validation middleware working
- Proper error messages for missing/invalid tokens
- Integration with existing authentication flow

## Benefits of the Adjustments

1. **Compliance**: Matches exact Swagger UI requirements
2. **Security**: Dual authentication (Bearer + Cybersoft token)
3. **Clarity**: Clear Vietnamese descriptions and error messages
4. **Consistency**: Proper content type and schema structure
5. **Maintainability**: Clean separation of authentication concerns

## Files Modified

1. **`src/common/swagger/swagger.config.js`**
   - Added TokenCybersoft security scheme
   - Updated BookingRequest schema
   - Enhanced BearerAuth description

2. **`src/routers/booking.router.js`**
   - Updated DatVe endpoint documentation
   - Added TokenCybersoft security requirement
   - Updated content type specification

3. **`src/common/middlewares/cybersoft-token.middleware.js`** (New)
   - Created TokenCybersoft validation middleware
   - Proper error handling and messages
   - Integration with request object

4. **`src/common/validators/booking.validator.js`**
   - Removed taiKhoan validation
   - Maintained other validation rules
   - Updated error messages

## API Usage Examples

### Book Tickets with Both Tokens
```bash
curl -X POST "http://localhost:3000/api/QuanLyDatVe/DatVe" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "TokenCybersoft: YOUR_CYBERSOFT_TOKEN" \
  -H "Content-Type: application/json-patch+json" \
  -d '{
    "maLichChieu": 1,
    "danhSachVe": [
      {
        "maGhe": 1,
        "giaVe": 75000
      }
    ]
  }'
```

### Error Responses
- **401 Unauthorized**: Missing or invalid Bearer token
- **401 Unauthorized**: Missing or invalid TokenCybersoft
- **400 Bad Request**: Invalid request body structure
- **500 Internal Server Error**: Server processing errors

## Verification
The API and Swagger interface adjustments have been thoroughly tested and verified:
- ✅ Swagger UI shows both required headers
- ✅ TokenCybersoft validation middleware working
- ✅ Proper error handling for missing tokens
- ✅ Request body structure matches requirements
- ✅ Content type properly configured
- ✅ Security schemes properly documented

The booking API now perfectly matches the Swagger UI requirements with dual authentication and proper request structure.
