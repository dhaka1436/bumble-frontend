import { TextInput, PasswordInput, NumberInput, Select, Button, Box, Grid, Group, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import styles from './SignUpForm.module.scss';
import axios from 'axios';
import { API_URL } from '../../utils/constants';
import { notifications } from '@mantine/notifications';
import { addUser } from '../../utils/userSlice';
import { useDispatch } from 'react-redux';

const SignUpForm = ({ setIsLogInForm }) => {
    const dispatch = useDispatch();
    const form = useForm({
        initialValues: { firstName: 'User', lastName: 'Testing', email: 'h@gmail.com', password: 'abcd1234@A', age: '24', gender: 'male', },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length < 6 ? 'Password must be at least 6 characters' : null),
            age: (value) => (parseInt(value) < 18 ? 'Must be at least 18 years old' : null),
        },
    });

    const handleSubmit = form.onSubmit(async (values) => {
        try {
            const response = await axios.post(`${API_URL}/auth/signup`, values, { withCredentials: true });
            if (response?.data?.status === "success") {
                notifications.show({
                    title: "Signup Success",
                    message: "Signup successful",
                    color: "green",
                });

                dispatch(addUser(response?.data?.data));
            }
        } catch (error) {
            console.error('Error signing up:', error);
        }
    });

    return (
        <div className={styles.signUpForm}>
            <Box component="form" onSubmit={handleSubmit} maw={800} mx="auto" p="xl" className={styles.detailsContainer}>
                <Grid gutter="md">
                    <Grid.Col span={6}>
                        <TextInput required label="First Name" placeholder="Your first name" {...form.getInputProps('firstName')} />
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <TextInput required label="Last Name" placeholder="Your last name" {...form.getInputProps('lastName')} />
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <TextInput required label="Email" placeholder="your@email.com" {...form.getInputProps('email')} />
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <PasswordInput required label="Password" placeholder="Create a password" {...form.getInputProps('password')} />
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <NumberInput required label="Age" placeholder="Your age" min={18} max={60} {...form.getInputProps('age')} />
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <Select required label="Gender" placeholder="Select gender" data={[
                            { value: 'male', label: 'Male' },
                            { value: 'female', label: 'Female' },
                            { value: 'other', label: 'Other' },
                        ]} {...form.getInputProps('gender')} />
                    </Grid.Col>
                </Grid>

                <Group justify="space-between" align="center" mt="xl">
                    <Button type="submit" size="md">
                        Sign Up
                    </Button>
                    <Text style={{ cursor: 'pointer' }} component="span" onClick={() => setIsLogInForm(true)}>
                        Already have an account? LogIn
                    </Text>
                </Group>
            </Box>
        </div>
    );
};

export default SignUpForm; 