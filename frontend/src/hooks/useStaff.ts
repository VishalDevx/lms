import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addStaff,getStaff,updateStaff } from "../api/staff.api";

import { StaffType } from "../types/zod";

export const useAddStaff = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(data:StaffType)=>addStaff(data),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["staff"]})
        }
    })
}
export const useStaff = () => {
  return useQuery({
    queryKey: ["all","staff"],
    queryFn: async () => {
      const res = await getStaff();
      return res.data;
    }
  });
};

export const useUpdateStaff = ()=>{
    return useMutation({
        mutationFn: ({ email, data }: { email: string; data: StaffType }) =>
             updateStaff(email, data),
    })
}