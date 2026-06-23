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
      filter.price =
        priceFilter;
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
    const product =
      await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error,
    });
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
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
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

export const updateProductStock =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const {
        stock,
      } = req.body;

      const product =
        await Product.findByIdAndUpdate(
          req.params.id,
          {
            stock,
          },
          {
            new: true,
          }
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
