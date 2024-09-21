import { Box, IconButton, Text } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

type Props = {
    field: string;
    value: string;
};


const UserDetailsRow = ({field, value}: Props) => {
    return (
        <Box display="flex">
            <Text flex={1} lineHeight='32px'>{field}: </Text>
            <Text flex={1} lineHeight='32px'>{value}</Text>
            <IconButton aria-label='Edit Name' icon={<EditIcon />} />
        </Box>
    )
} 

export default UserDetailsRow;
