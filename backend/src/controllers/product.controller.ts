import { Request, Response } from "express";
import Product from "../models/Product";

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

    const filter: ProductFilter =
      {};

    if (
      typeof search ===
        "string" &&
      search.trim()
    ) {
      filter.$or = [
        {
          name: {
            $regex:
              search.trim(),
            $options:
              "i",
          },
        },
        {
          description: {
            $regex:
              search.trim(),
            $options:
              "i",
          },
        },
      ];
    }

    if (
      typeof category ===
        "string" &&
      category.trim()
    ) {
      filter.category = {
        $regex:
          `^${category.trim()}$`,
        $options:
          "i",
      };
    }

    const priceFilter: {
      $gte?: number;
      $lte?: number;
    } = {};

    if (
      typeof minPrice ===
      "string"
    ) {
      const parsed =
        Number(
          minPrice
        );

      if (
        Number.isFinite(
          parsed
        )
      ) {
        priceFilter.$gte =
          parsed;
      }
    }

    if (
      typeof maxPrice ===
      "string"
    ) {
      const parsed =
        Number(
          maxPrice
        );

      if (
        Number.isFinite(
          parsed
        )
      ) {
        priceFilter.$lte =
          parsed;
      }
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
      sort ===
      "price-low"
        ? "price"
        : sort ===
            "price-high"
          ? "-price"
          : sort ===
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
