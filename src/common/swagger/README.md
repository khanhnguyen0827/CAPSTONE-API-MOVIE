# 🎨 Custom Swagger UI Configuration

## 📁 File Structure

```
src/common/swagger/
├── swagger.config.js          # Main Swagger configuration with schemas
├── swagger-setup.js           # Swagger UI setup and options
├── swagger-ui-custom.css      # Custom CSS styling
├── swagger-ui-custom.js       # Custom JavaScript enhancements
└── README.md                  # This documentation
```

## 🎯 Features

### ✨ Custom Styling (`swagger-ui-custom.css`)
- **Modern Design**: Clean, professional interface
- **Color-coded HTTP Methods**: GET (blue), POST (green), PUT (orange), DELETE (red)
- **Responsive Layout**: Mobile-friendly design
- **Smooth Animations**: Expand/collapse transitions
- **Custom Header**: Branded header with logo and version
- **Enhanced Typography**: Better readability with custom fonts

### ⚡ JavaScript Enhancements (`swagger-ui-custom.js`)
- **Interactive Sections**: Click to expand/collapse API groups
- **Custom Header**: Dynamic header with logo and branding
- **Enhanced Search**: Improved search functionality
- **Mobile Optimization**: Better mobile experience
- **Custom Tooltips**: Helpful tooltips for better UX
- **Loading States**: Custom loading animations

### ⚙️ Configuration (`swagger-setup.js`)
- **Persistent Authorization**: JWT tokens persist across sessions
- **Request/Response Interceptors**: Custom request/response handling
- **Deep Linking**: Direct links to specific endpoints
- **Filter Options**: Advanced filtering capabilities
- **Documentation Expansion**: Configurable default expansion levels

## 🎨 Design Features

### Color Scheme
```css
Primary: #667eea (Blue)
Secondary: #764ba2 (Purple)
Success: #4caf50 (Green)
Warning: #ff9800 (Orange)
Error: #f44336 (Red)
Info: #2196f3 (Light Blue)
```

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headers**: 700 weight
- **Body**: 400 weight
- **Code**: Monaco/Menlo monospace

### Layout
- **Header**: Gradient background with logo and version badge
- **API Sections**: Collapsible cards with color-coded methods
- **Responsive**: Mobile-first design approach
- **Accessibility**: Focus states and keyboard navigation

## 🔧 Configuration Options

### Swagger UI Options
```javascript
{
  persistAuthorization: true,        // Keep auth tokens
  displayRequestDuration: true,     // Show request timing
  filter: true,                     // Enable filtering
  deepLinking: true,                // Direct links to endpoints
  defaultModelsExpandDepth: 1,      // Schema expansion level
  docExpansion: 'list',             // Default expansion state
  showExtensions: true,             // Show OpenAPI extensions
  tryItOutEnabled: true             // Enable "Try it out" by default
}
```

### Custom Features
- **Request Interceptor**: Adds custom headers
- **Response Interceptor**: Processes responses
- **Custom CSS**: Modern styling
- **Custom JS**: Enhanced functionality

## 🚀 Usage

### 1. Access Swagger UI
```
http://localhost:3000/api/v1/docs
```

### 2. Authentication
1. Click "Authorize" button (🔒)
2. Enter JWT token: `Bearer YOUR_TOKEN`
3. Click "Authorize"

### 3. Testing APIs
1. Expand API section
2. Click "Try it out"
3. Fill required parameters
4. Click "Execute"

## 🎯 Customization

### Adding New Styles
Edit `swagger-ui-custom.css`:
```css
/* Custom endpoint styling */
.swagger-ui .opblock.opblock-custom {
  background: #your-color;
  border-left: 4px solid #your-accent;
}
```

### Adding JavaScript Features
Edit `swagger-ui-custom.js`:
```javascript
function customFeature() {
  // Your custom functionality
}
```

### Modifying Configuration
Edit `swagger-setup.js`:
```javascript
const swaggerUIOptions = {
  // Your custom options
  swaggerOptions: {
    // Custom swagger options
  }
};
```

## 📱 Mobile Features

### Responsive Design
- **Flexible Layout**: Adapts to screen size
- **Touch-friendly**: Larger touch targets
- **Readable Text**: Optimized font sizes
- **Collapsible Sections**: Easy navigation

### Mobile Enhancements
- **Swipe Gestures**: Touch interactions
- **Optimized Buttons**: Larger click areas
- **Simplified Navigation**: Streamlined interface

## 🔍 Search & Filter

### Enhanced Search
- **Real-time Filtering**: Instant results
- **Multi-field Search**: Path, description, tags
- **Highlighted Results**: Visual feedback
- **Case-insensitive**: Flexible matching

### Filter Options
- **HTTP Methods**: Filter by GET, POST, etc.
- **Tags**: Filter by API categories
- **Status Codes**: Filter by response codes
- **Authentication**: Filter by auth requirements

## 🎨 Theme Customization

### Color Variables
```css
:root {
  --swagger-primary: #667eea;
  --swagger-secondary: #764ba2;
  --swagger-success: #4caf50;
  --swagger-warning: #ff9800;
  --swagger-error: #f44336;
  --swagger-info: #2196f3;
}
```

### Branding
- **Logo**: Custom SVG logo in header
- **Colors**: Brand-consistent color scheme
- **Typography**: Custom font choices
- **Layout**: Brand-specific spacing

## 🔧 Development

### File Dependencies
```
swagger.config.js ← swagger-setup.js ← server.js
                ↓
swagger-ui-custom.css
swagger-ui-custom.js
```

### Adding New Features
1. **CSS**: Add styles to `swagger-ui-custom.css`
2. **JS**: Add functions to `swagger-ui-custom.js`
3. **Config**: Update `swagger-setup.js`
4. **Test**: Restart server and test changes

### Best Practices
- **Modular CSS**: Use BEM methodology
- **Progressive Enhancement**: Graceful degradation
- **Accessibility**: WCAG 2.1 compliance
- **Performance**: Optimized loading

## 🐛 Troubleshooting

### Common Issues
1. **CSS not loading**: Check file paths
2. **JS errors**: Check browser console
3. **Styling issues**: Clear browser cache
4. **Mobile problems**: Test responsive design

### Debug Mode
Add to `swagger-setup.js`:
```javascript
swaggerOptions: {
  // ... other options
  debug: true
}
```

## 📚 Resources

- **Swagger UI**: https://swagger.io/tools/swagger-ui/
- **OpenAPI Spec**: https://swagger.io/specification/
- **CSS Guidelines**: https://developer.mozilla.org/en-US/docs/Web/CSS
- **JavaScript**: https://developer.mozilla.org/en-US/docs/Web/JavaScript

---

**Happy Customizing! 🎨**
