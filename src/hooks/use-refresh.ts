import { useQueryClient } from '@tanstack/react-query';

const useRefresh = () => {
    const queryClient = useQueryClient();

    return async () => {
        await queryClient.refetchQueries({
            type: 'active',
        });
    }
}

export default useRefresh;