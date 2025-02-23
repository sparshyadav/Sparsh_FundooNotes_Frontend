import { toast } from "react-hot-toast";

export const successToast = (success) => {
    toast.success(success, {
        position: "top-right",
    });
};

export const errorToast = (error) => {
    toast.error(error, {
        position: "top-right",
    });
};