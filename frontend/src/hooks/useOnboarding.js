import { useMutation, useQueryClient } from '@tanstack/react-query';
import { completeOnboarding } from '../lib/api.js';
import toast from 'react-hot-toast';

const useOnboarding = () => {
    const queryClient = useQueryClient();

    const { mutate: onboardingMutation, isPending, error } = useMutation({
        mutationFn: completeOnboarding,
        onSuccess: () => {
            toast.success("Profile onboarded successfully")
            queryClient.invalidateQueries({ queryKey: ['authUser'] })
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })

    return { onboardingMutation, isPending, error}
}

export default useOnboarding