// import { rest } from "msw";
import { http, HttpResponse } from "msw";
import {
  mockProducts,
  mockCategories,
  mockPromotionEvents,
  mockProductPromotionEvents,
} from "./data";

export const handlers = [
  // Products API
  http.get("http://localhost:8000/api/products/", ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get("search");
    const category = url.searchParams.get("category");
    const page = parseInt(url.searchParams.get("page") || "1");
    const pageSize = parseInt(url.searchParams.get("page_size") || "12");
    const minPrice = url.searchParams.get("min_price");
    const maxPrice = url.searchParams.get("max_price");

    let filteredProducts = [...mockProducts];

    // Apply filters
    if (search) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category.slug === category
      );
    }

    if (minPrice) {
      filteredProducts = filteredProducts.filter(
        (product) => parseFloat(product.price) >= parseFloat(minPrice)
      );
    }

    if (maxPrice) {
      filteredProducts = filteredProducts.filter(
        (product) => parseFloat(product.price) <= parseFloat(maxPrice)
      );
    }

    // Pagination
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return HttpResponse.json({
      count: filteredProducts.length,
      next:
        endIndex < filteredProducts.length
          ? `http://localhost:8000/api/products/?page=${page + 1}`
          : null,
      previous:
        page > 1
          ? `http://localhost:8000/api/products/?page=${page - 1}`
          : null,
      results: paginatedProducts,
    });
  }),

  // Get single product
  http.get("http://localhost:8000/api/products/:id/", ({ params }) => {
    const { id } = params;
    const product = mockProducts.find((p) => p.id === parseInt(id as string));

    if (!product) {
      return HttpResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return HttpResponse.json(product);
  }),

  // Categories API
  http.get("http://localhost:8000/api/categories/", () => {
    return HttpResponse.json(mockCategories);
  }),

  // Promotion Events API
  http.get("http://localhost:8000/api/promotion-events/", () => {
    return HttpResponse.json(mockPromotionEvents);
  }),

  // Product Promotion Events API
  http.get("http://localhost:8000/api/product-promotion-events/", () => {
    return HttpResponse.json(mockProductPromotionEvents);
  }),
];

// export const handlers = [
//   // Products API
//   rest.get("http://localhost:8000/api/products/", (req, res, ctx) => {
//     return res(ctx.json(mockProducts));
//   }),
//   rest.get("http://localhost:8000/api/products/:id/", (req, res, ctx) => {
//     return res(
//       ctx.json(mockProducts.find((p) => p.id === parseInt(req.params.id)))
//     );
//   }),
//   rest.get("http://localhost:8000/api/categories/", (req, res, ctx) => {
//     return res(ctx.json(mockCategories));
//   }),
//   rest.get("http://localhost:8000/api/promotion-events/", (req, res, ctx) => {
//     return res(ctx.json(mockPromotionEvents));
//   }),
//   rest.get(
//     "http://localhost:8000/api/product-promotion-events/",
//     (req, res, ctx) => {
//       return res(ctx.json(mockProductPromotionEvents));
//     }
//   ),
// ];
