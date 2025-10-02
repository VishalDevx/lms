import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignFee } from "../api/fee.api";
import { FeeStructureType } from "../types/zod";

export const useAssignFee = ()=>{
const queryClient = useQueryClient();
return useMutation({
    mutationFn:(data:FeeStructureType)=>assignFee(data),
  onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["fees"]})
        }
})
}
