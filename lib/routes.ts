const API_BASE =  https://food-order-api-85i3.onrender.com

export const ROUTES = {
  LOGIN: `${API_BASE}/login`,
  SUPERUSER: {
    CREATE_ADMIN: `${API_BASE}/superuser/admins`,
    GET_ADMINS: `${API_BASE}/superuser/admins`,
    DELETE_ADMIN: (id: number) => `${API_BASE}/superuser/admins/${id}`,
    UPDATE_ADMIN: (id: number) => `${API_BASE}/superuser/admins/${id}`, // 
    REGISTER: `${API_BASE}/superuser/signup`,
  },
  MENU: {
    CREATE: `${API_BASE}/menu`,
    LIST: `${API_BASE}/menu`,
    UPDATE: (id: number) => `${API_BASE}/menu/${id}`,
    DELETE: (id: number) => `${API_BASE}/menu/${id}`,
    BY_TABLE: (tableId: number) => `${API_BASE}/menu/public/by-table-id/${tableId}`,
    BY_CAT: (tableId: number) => `${API_BASE}/menu/public/categories/by-table-id/${tableId}`,

  },
  TABLE: {
    LISTs: `${API_BASE}/tables/public`,
    CREATE: `${API_BASE}/tables`,
    LIST: `${API_BASE}/tables`,
    UPDATE: (id: number) => `${API_BASE}/tables/${id}`,
    DELETE: (id: number) => `${API_BASE}/tables/${id}`,
     
  },
  ORDER: {
    CREATE: `${API_BASE}/orders`,
    LIST: `${API_BASE}/orders`,
   UPDATE_STATUS: (id: number, status: string) =>
  `${API_BASE}/orders/${id}/status?status=${status.trim()}`,
    DELETE: (id: number) => `${API_BASE}/orders/${id}`, // ✅ Add this line
    POLL_NEW: `${API_BASE}/orders/poll-new-orders`,
    LIST_History: `${API_BASE}/orders/history`,
  },
  OTP: {
    CREATE: `${API_BASE}/otp/request-otp`,
    LIST: `${API_BASE}/otp/verify-otp`,
    PASSRQST: `${API_BASE}/otp/request-password-otp`,
    PASSCHANGE: `${API_BASE}/otp/verify-password-otp`,
  },
}
