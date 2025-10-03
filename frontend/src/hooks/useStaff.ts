import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query";
import { addStaff,getStaff,updateStaff,getByName } from "../api/staff.api";

import { staffSchema, StaffType } from "../types/zod";
import { AxiosResponse } from "axios";

export const useAddStaff = (): UseMutationResult<
  AxiosResponse<any>, // return type from axios
  Error,             // error type
  StaffType        // variables type
> => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<any>, Error, StaffType>({
    mutationFn: (data: StaffType) => addStaff(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all", "staff"] });
    },
  });
};
export const useStaff = () => {
  return useQuery({
    queryKey: ["all","staff"],
    queryFn: async () => {
      const res = await getStaff();
      return res.data;
    }
  });
};

export const useStaffByName = (email: string) => {
  return useQuery<StaffType>({
    queryKey: ["staff", email],
    queryFn: async () => {
      const res = await getByName(email);
      return staffSchema.parse(res.data); // validates response
    },
    enabled: !!email, // only fetch if email exists
  });
};
export const useUpdateStaff = ()=>{
    return useMutation({
        mutationFn: ({ email, data }: { email: string; data: StaffType }) =>
             updateStaff(email, data),
    })
}