import { AxiosInstance } from "axios";
import {
  DataProvider,
  HttpError,
  CrudOperators,
  CrudFilters,
  CrudSorting,
} from "@pankod/refine-core";
import { stringify } from "querystring";

import { axiosInstance } from "./authProvider";

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    };

    return Promise.reject(customError);
  }
);
const mapOperator = (operator: CrudOperators): string => {
  switch (operator) {
    case "ne":
    case "gte":
    case "lte":
      return `__${operator}`;
    case "contains":
      return "_like";
    case "eq":
    default:
      return "";
  }
};

const generateSort = (sort?: CrudSorting) => {
  if (sort && sort.length > 0) {
    const _sort: string[] = [];
    const _order: string[] = [];

    sort.forEach((item) => {
      _sort.push(item.field);
      _order.push(item.order);
    });

    return {
      _sort,
      _order,
    };
  }

  return;
};

const generateFilter = (filters?: CrudFilters) => {
  const queryFilters: { [key: string]: string } = {};
  if (filters) {
    filters.forEach((filter) => {
      if (filter.operator === "or" || filter.operator === "and") {
        // do according
      }
      if ("field" in filter) {
        const { field, operator, value } = filter;
        if (field === "search") {
          queryFilters[field] = value;
          return;
        }
        const mappedOperator = mapOperator(operator);
        queryFilters[`${field}${mappedOperator}`] = value;
      }
    });
  }
  return queryFilters;
};

export const DjangoDataProvider = (
  apiUrl: string,
  httpClient: AxiosInstance = axiosInstance
): Omit<
  Required<DataProvider>,
  "createMany" | "updateMany" | "deleteMany"
> => ({
  getList: async ({
    resource,
    hasPagination = true,
    pagination = { current: 1, pageSize: 7 },
    filters,
    sort,
  }) => {
    const url = `${apiUrl}/${resource}`;

    const { current = 1 } = pagination ?? {};

    const queryFilters = generateFilter(filters);

    const query: {
      page?: number;
      _sort?: string;
      ordering?: string;
    } = hasPagination
      ? {
          page: current,
        }
      : {};
    const generatedSort = generateSort(sort);
    if (generatedSort) {
      const { _sort, _order } = generatedSort;
      query.ordering =
        _order[0] === "asc" ? _sort.join(",") : "-" + _sort.join(",");
    }
    const { data } = await httpClient.get(
      `${url}?${stringify(query)}&${stringify(queryFilters)}`
    );

    return {
      data: data.results,
      total: data.count,
    };
  },

  getMany: async ({ resource, ids }) => {
    const { data } = await httpClient.get(
      `${apiUrl}/${resource}?${stringify({ id__in: String(ids) })}`
    );
    return {
      data,
    };
  },

  create: async ({ resource, variables }) => {
    const url = `${apiUrl}/${resource}/`;
    const { data } = await httpClient.post(url, variables);
    return {
      data,
    };
  },

  update: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}/`;
    const { data } = await httpClient.patch(url, variables);
    return {
      data,
    };
  },
  getOne: async ({ resource, id }) => {
    const url = `${apiUrl}/${resource}/${id}`;
    const { data } = await httpClient.get(url);
    return {
      data,
    };
  },
  deleteOne: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}/`;
    const { data } = await httpClient.delete(url, {
      data: variables,
    });
    return {
      data,
    };
  },
  getApiUrl: () => {
    return apiUrl;
  },
  custom: async ({ url, method, filters, sort, payload, query, headers }) => {
    let requestUrl = `${url}?`;

    if (sort) {
      const generatedSort = generateSort(sort);
      if (generatedSort) {
        const { _sort, _order } = generatedSort;
        const sortQuery = {
          _sort: _sort.join(","),
          _order: _order.join(","),
        };
        requestUrl = `${requestUrl}&${stringify(sortQuery)}`;
      }
    }

    if (filters) {
      const filterQuery = generateFilter(filters);
      requestUrl = `${requestUrl}&${stringify(filterQuery)}`;
    }

    if (query) {
      requestUrl = `${requestUrl}&${stringify(query)}`;
    }

    if (headers) {
      httpClient.defaults.headers = {
        ...httpClient.defaults.headers,
        ...headers,
      };
    }

    let axiosResponse;
    switch (method) {
      case "put":
      case "post":
      case "patch":
        axiosResponse = await httpClient[method](url, payload);
        break;
      case "delete":
        axiosResponse = await httpClient.delete(url, {
          data: payload,
        });
        break;
      default:
        axiosResponse = await httpClient.get(requestUrl);
        break;
    }

    const { data } = axiosResponse;

    return Promise.resolve({ data });
  },
});
