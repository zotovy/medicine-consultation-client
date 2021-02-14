export type GetAppointsDatesResponse = {
    success: true,
    dates: string[],
} | {
    success: false;
    error: "invalid_id" | "not_authorize" | "invalid_token" | "no_user_found" | "invalid_error";
}

export type GetAppointsResponse = {
    success: true,
    appoints: IAppointment[],
} | {
    success: false,
    error: "invalid_id" | "not-found" | "invalid_error";
}

export type GetAppointRequestsResponse = {
    success: true,
    requests: IAppointRequest[],
} | {
    success: false,
    error: "invalid_id" | "not_authorize" | "invalid_token" | "no_user_found" | "invalid_error";
}

export type PostConfirmAppointRequest = {
    success: true,
} | {
    success: false,
    error: "invalid_id" | "not_authorize" | "invalid_token" | "no_user_found" | "invalid_error"
}

export type PostRejectAppointRequest = {
    success: true,
} | {
    success: false,
    error: "invalid_id" | "not_authorize" | "invalid_token" | "no_user_found" | "invalid_error"
}

export type PostRejectAppoint = {
    success: true,
} | {
    success: false,
    error: "invalid_id" | "not_authorize" | "invalid_token" | "no_user_found" | "invalid_error"
}

export type GetAppointByIdResponse = {
    success: true,
    appoint: IAppointment,
} | {
    success: false,
    error: "not_authorize" | "invalid_token" | "not_found" | "invalid_error"
}

export type DoctorHubLoadProps = {
    selected?: string;
}
