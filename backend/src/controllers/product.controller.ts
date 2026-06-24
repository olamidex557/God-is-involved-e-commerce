import { Request, Response } from "express";
import Product from "../models/Product";

type QueryValue =
  Request["query"][string];

interface ProductFilter {
  $or?: {
    name?: {
      $regex: string;
      $options: string;
    };
    description?: {
      $regex: string;
      $options: string;
    };
  }[];
  category?: {
    $regex: string;
    $options: string;
  };
  price?: {
    $gte?: number;
    $lte?: number;
  };
  $and?: Record<
    string,
    unknown
  >[];
}

const getQueryString =
  (
    value: QueryValue
  ) => {
    if (
      typeof value !==
      "string"
    ) {
      return undefined;
    }

    const trimmed =
      value.trim();

    return trimmed ===
      ""
      ? undefined
      : trimmed;
  };

const getQueryNumber =
  (
    value: QueryValue
  ) => {
    const normalized =
      getQueryString(
        value
      );

    if (!normalized) {
      return undefined;
    }

    const parsed =
      Number(
        normalized
      );

    return Number.isFinite(
      parsed
    )
      ? parsed
      : undefined;
  };

const escapeRegex =
  (
    value: string
  ) =>
    value.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

const slugify = (
  value: string
) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const normalizeProductPayload =
  (
    body: Record<
      string,
      unknown
    >
  ) => {
    const next = {
      ...body,
    };

    if (
      typeof next.slug !==
        "string" ||
      next.slug.trim() === ""
    ) {
      if (
        typeof next.name ===
          "string" &&
        next.name.trim() !== ""
      ) {
        next.slug = slugify(
          next.name
        );
      }
    } else {
      next.slug = slugify(
        next.slug
      );
    }

    return next;
  };

const sendProductError =
  (
    error: unknown,
    res: Response,
    fallbackMessage: string
  ) => {
    console.error(error);

    if (
      typeof error ===
        "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return res.status(409).json({
        success: false,
        message:
          "A product with this slug already exists",
      });
    }

    if (
      typeof error ===
        "object" &&
      error !== null &&
      "name" in error &&
      error.name ===
        "ValidationError"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Validation failed",
        error,
      });
    }

    return res.status(500).json({
      success: false,
      message:
        fallbackMessage,
    });
  };

export const getProducts = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      sort,
    } = req.query;

    const searchTerm =
      getQueryString(
        search
      );

    const categoryTerm =
      getQueryString(
        category
      );

    const minimumPrice =
      getQueryNumber(
        minPrice
      );

    const maximumPrice =
      getQueryNumber(
        maxPrice
      );

    const sortKey =
      getQueryString(
        sort
      );

    const filter: ProductFilter =
      {};

    if (searchTerm) {
      const escapedSearchTerm =
        escapeRegex(
          searchTerm
        );

      filter.$or = [
        {
          name: {
            $regex:
              escapedSearchTerm,
            $options:
              "i",
          },
        },
        {
          description: {
            $regex:
              escapedSearchTerm,
            $options:
              "i",
          },
        },
      ];
    }

    if (categoryTerm) {
      filter.category = {
        $regex:
          `^${escapeRegex(
            categoryTerm
          )}$`,
        $options:
          "i",
      };
    }

    const priceFilter: {
      $gte?: number;
      $lte?: number;
    } = {};

    if (
      minimumPrice !==
      undefined
    ) {
      priceFilter.$gte =
        minimumPrice;
    }

    if (
      maximumPrice !==
      undefined
    ) {
      priceFilter.$lte =
        maximumPrice;
    }

    if (
      Object.keys(
        priceFilter
      ).length > 0
    ) {
      filter.$and = [
        ...(filter.$and ??
          []),
        {
          $or: [
            {
              price:
                priceFilter,
            },
            {
              "variants.sizes.price":
                priceFilter,
            },
          ],
        },
      ];
    }

    const sortOption:
      string =
      sortKey ===
        "price-low"
        ? "price"
        : sortKey ===
          "price-high"
          ? "-price"
          : sortKey ===
            "featured"
            ? "-featured -createdAt"
            : "-createdAt";

    const products =
      await Product.find(
        filter
      ).sort(
        sortOption
      );

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const createProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const payload =
      normalizeProductPayload(
        req.body
      );

    const product =
      await Product.create(
        payload
      );

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    sendProductError(
      error,
      res,
      "Failed to create product"
    );
  }
};

export const getProductById = async (
  req: Request,
  res: Response
) => {
  try {
    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message:
          "Product not found",
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Server Error",
    });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message:
          "Product not found",
      });
    }

    product.set(
      normalizeProductPayload(
        req.body
      )
    );

    await product.save();

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    sendProductError(
      error,
      res,
      "Failed to update product"
    );
  }
};

export const updateProductStock =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const {
        color,
        size,
        stock,
        lowStockThreshold,
      } = req.body;

      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {
        return res.status(404).json({
          success: false,
          message:
            "Product not found",
        });
      }

      const targetColor =
        typeof color ===
        "string"
          ? color.trim()
          : "Default";

      const targetSize =
        typeof size ===
        "string"
          ? size.trim()
          : "Standard";

      const variant =
        product.variants.find(
          (
            productVariant
          ) =>
            productVariant.color.toLowerCase() ===
            targetColor.toLowerCase()
        );

      const sizeOption =
        variant?.sizes.find(
          (
            productSize
          ) =>
            productSize.size.toLowerCase() ===
            targetSize.toLowerCase()
        );

      if (
        !variant ||
        !sizeOption
      ) {
        return res.status(404).json({
          success: false,
          message:
            "Variant size not found",
        });
      }

      const parsedStock =
        Number(
          stock
        );

      if (
        !Number.isFinite(
          parsedStock
        ) ||
        parsedStock < 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "stock must be a non-negative number",
        });
      }

      sizeOption.stock =
        parsedStock;

      if (
        lowStockThreshold !==
        undefined
      ) {
        const parsedThreshold =
          Number(
            lowStockThreshold
          );

        if (
          !Number.isFinite(
            parsedThreshold
          ) ||
          parsedThreshold < 0
        ) {
          return res.status(400).json({
            success: false,
            message:
              "lowStockThreshold must be a non-negative number",
          });
        }

        sizeOption.lowStockThreshold =
          parsedThreshold;
      }

      await product.save();

      res.json({
        success: true,
        product,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to update stock",
      });
    }
  };

export const deleteProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const product =
      await Product.findByIdAndDelete(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message:
          "Product not found",
      });
    }

    res.json({
      success: true,
      message:
        "Product deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Server Error",
    });
  }
};
