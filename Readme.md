# 🛒 E-commerce API

A modern, RESTful e-commerce API built with Django and Django REST Framework. This project provides a complete backend solution for managing products, categories, inventory, promotions, and orders.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Database Setup](#-database-setup)
- [API Documentation](#-api-documentation)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- **Product Management**: Complete CRUD operations for products with categories
- **Inventory Tracking**: Real-time stock management with quantity tracking
- **Category Hierarchy**: Multi-level category system with parent-child relationships
- **Promotion System**: Flexible promotion and discount management
- **Order Processing**: Complete order lifecycle management
- **RESTful API**: Clean, well-documented REST endpoints
- **API Documentation**: Auto-generated Swagger/OpenAPI documentation
- **Admin Interface**: Django admin for easy data management

## 🛠 Tech Stack

- **Backend Framework**: Django 5.2.4
- **API Framework**: Django REST Framework 3.16.0
- **Database**: SQLite (development) / PostgreSQL (production)
- **API Documentation**: drf-spectacular
- **Code Quality**: Black, Flake8
- **Environment Management**: python-dotenv

## 📁 Project Structure

```
full-stack-django-react-app-ecommerce-1/
├── ecommerce/                 # Main Django project
│   ├── settings.py           # Project settings
│   ├── urls.py              # Main URL configuration
│   └── wsgi.py              # WSGI application
├── products/                 # Products app
│   ├── models.py            # Product and Category models
│   ├── views.py             # API views
│   ├── serializers.py       # DRF serializers
│   └── urls.py              # Product URLs
├── promotions/              # Promotions app
│   ├── models.py            # Promotion models
│   └── views.py             # Promotion views
├── orders/                  # Orders app
│   ├── models.py            # Order models
│   └── views.py             # Order views
├── custom_scripts/          # Data loading utilities
│   └── load_data_from_csv.py
├── data/                    # Sample data files
│   ├── category.csv
│   ├── product.csv
│   └── stockmanagement.csv
├── requirements.txt         # Python dependencies
├── manage.py               # Django management script
└── README.md              # This file
```

## 🚀 Installation

### Prerequisites

- Python 3.8+
- pip (Python package installer)
- Git

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd full-stack-django-react-app-ecommerce-1
```

### Step 2: Create Virtual Environment

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 4: Environment Configuration

Create a `.env` file in the project root:

```env
# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=True

# Database Settings
DATABASE_URL=sqlite:///db.sqlite3

# Other Settings
ALLOWED_HOSTS=localhost,127.0.0.1
```

## ⚙️ Configuration

### Database Configuration

The project uses SQLite by default for development. For production, update `ecommerce/settings.py`:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'your_db_name',
        'USER': 'your_db_user',
        'PASSWORD': 'your_db_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

## 🗄️ Database Setup

### 1. Run Migrations

```bash
# Create database tables
python manage.py makemigrations

# Apply migrations
python manage.py migrate
```

### 2. Create Superuser

```bash
python manage.py createsuperuser
```

### 3. Load Sample Data (Optional)

```bash
# Start Django shell
python manage.py shell

# Load sample data
from custom_scripts.load_data_from_csv import load_all_data
load_all_data()
```

## 📚 API Documentation

### Available Endpoints

- **Admin Interface**: `http://localhost:8000/admin/`
- **API Root**: `http://localhost:8000/api/`
- **Categories**: `http://localhost:8000/api/categories/`
- **Products**: `http://localhost:8000/api/products/`
- **Stock Management**: `http://localhost:8000/api/stock/`
- **Swagger Documentation**: `http://localhost:8000/api/schema/swagger-ui/`
- **ReDoc Documentation**: `http://localhost:8000/api/schema/redoc/`

### API Examples

#### Get All Categories
```bash
curl -X GET http://localhost:8000/api/categories/
```

#### Get Products by Category
```bash
curl -X GET http://localhost:8000/api/categories/1/products/
```

#### Create a Product
```bash
curl -X POST http://localhost:8000/api/products/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Product",
    "slug": "new-product",
    "category_id": 1,
    "price": "99.99",
    "description": "Product description"
  }'
```

## 🛠 Development

### Running the Development Server

```bash
python manage.py runserver
```

The application will be available at `http://localhost:8000/`

### Code Quality

The project uses several tools for code quality:

```bash
# Format code with Black
black .

# Check code style with Flake8
flake8 .

# Run type checking (if mypy is configured)
mypy .
```

### Database Management

```bash
# Create new migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Show migration status
python manage.py showmigrations
```

### Shell Access

```bash
# Start Django shell
python manage.py shell

# Load data utilities
from custom_scripts.load_data_from_csv import load_category_data, load_product_data
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
python manage.py test

# Run specific app tests
python manage.py test products

# Run with coverage
coverage run --source='.' manage.py test
coverage report
```

### API Testing

```bash
# Test API endpoints
python manage.py test products.tests
```

## 🚀 Deployment

### Production Checklist

1. **Environment Variables**
   - Set `DEBUG=False`
   - Configure `SECRET_KEY`
   - Set `ALLOWED_HOSTS`

2. **Database**
   - Use PostgreSQL or MySQL
   - Configure database credentials

3. **Static Files**
   ```bash
   python manage.py collectstatic
   ```

4. **Security**
   - Use HTTPS
   - Configure CORS settings
   - Set up proper authentication

### Docker Deployment

```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
RUN python manage.py collectstatic --noinput

EXPOSE 8000
CMD ["gunicorn", "ecommerce.wsgi:application", "--bind", "0.0.0.0:8000"]
```

## 📊 Database Schema

The application includes a comprehensive database schema with:

- **Categories**: Hierarchical product categories
- **Products**: Product information with pricing
- **Stock Management**: Inventory tracking
- **Promotions**: Discount and promotion management
- **Orders**: Order processing and management

See [ERD.md](ERD.md) for detailed entity relationship diagrams.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow PEP 8 style guidelines
- Write tests for new features
- Update documentation as needed
- Use meaningful commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 📈 Roadmap

- [ ] User authentication and authorization
- [ ] Shopping cart functionality
- [ ] Payment integration
- [ ] Email notifications
- [ ] Advanced search and filtering
- [ ] Mobile app API endpoints
- [ ] Analytics and reporting
- [ ] Multi-language support

---

**Built with ❤️ using Django and Django REST Framework**
