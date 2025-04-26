import { useState, useEffect } from 'react';
import { Card, Avatar, Text, Group, Badge, Button, Stack, TextInput, Textarea, NumberInput, MultiSelect, Select, Divider, ScrollArea, Alert } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import styles from './ProfileCard.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import UserCard from '../UserCard/UserCard';
import axios from 'axios';
import { API_URL } from '../../utils/constants';
import { addUser } from '../../utils/userSlice';

const skillOptions = ['JavaScript', 'TypeScript', 'React', 'Angular', 'Vue', 'Node.js', 'Express', 'MongoDB', 'SQL', 'Python', 'Java', 'C#', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'GraphQL', 'REST API', 'HTML', 'CSS', 'SASS', 'Redux', 'MobX', 'Git', 'CI/CD', 'C++', 'Flutter'];

const genderOptions = [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }, { value: 'others', label: 'Others' }];

const MAX_SKILLS = 5;

const ProfileCard = () => {
    const user = useSelector(state => state.user);
    const [isEditing, setIsEditing] = useState(false);
    const [previewData, setPreviewData] = useState(user);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();


    const form = useForm({
        initialValues: { firstName: user?.firstName || '', lastName: user?.lastName || '', age: user?.age || 18, gender: user?.gender || '', photoUrl: user?.photoUrl || '', skills: user?.skills || [], about: user?.about || '' },
        validate: { firstName: (value) => value.trim().length === 0 ? 'First name is required' : null, lastName: (value) => value.trim().length === 0 ? 'Last name is required' : null, age: (value) => !value || value < 18 ? 'Age must be at least 18' : null, gender: (value) => !value ? 'Gender is required' : null, skills: (value) => value.length > MAX_SKILLS ? `You can select at most ${MAX_SKILLS} skills` : null, }
    });

    useEffect(() => {
        if (isEditing && user) {
            form.reset();
            form.setValues({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                age: user.age || 18,
                gender: user.gender || '',
                photoUrl: user.photoUrl || '',
                skills: user.skills || [],
                about: user.about || ''
            });
            setError('');
        }
    }, [isEditing, user]);

    // Update preview data when form values change
    useEffect(() => {
        if (isEditing) {
            const formValues = form.values;
            setPreviewData({
                ...user,
                ...formValues
            });
        }
    }, [form.values, isEditing, user]);

    const handleEditClick = () => {
        if (user) {
            form.setValues({ firstName: user.firstName || '', lastName: user.lastName || '', age: user.age || 18, gender: user.gender || '', photoUrl: user.photoUrl || '', skills: user.skills || [], about: user.about || '' });
        }
        setIsEditing(true);
        setError('');
    };

    const handleSubmit = async (values) => {
        // Validate skills count
        if (values.skills.length > MAX_SKILLS) {
            setError(`You can select at most ${MAX_SKILLS} skills`);
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {

            const response = await axios.patch(`${API_URL}/profile/edit`, {
                firstName: values.firstName,
                lastName: values.lastName,
                age: values.age,
                gender: values.gender,
                photoUrl: values.photoUrl,
                skills: values.skills,
                about: values.about
            }, { withCredentials: true });

            if (response?.data?.status === "success") {
                dispatch(addUser(response?.data?.data));
                setIsEditing(false);
                notifications.show({
                    title: 'Success',
                    message: 'Profile updated successfully',
                    color: 'green'
                });

            }
        } catch (err) {
            console.error('Error updating profile:', err?.response?.data?.data);
            setError(err?.response?.data?.data);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFormChange = () => {

        if (error) setError('');

        setPreviewData({
            ...user,
            ...form.values
        });
    };

    if (isEditing) {
        return (
            <div className={styles.editContainer}>
                <ScrollArea h="90vh" className={styles.editFormCard}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Card.Section mb="md" className={styles.cardHeader}>
                            <div className={styles.headerContent}>
                                <Text fw={700} size="xl">Edit Profile</Text>
                            </div>
                        </Card.Section>

                        <form onSubmit={form.onSubmit(handleSubmit)} onChange={handleFormChange}>
                            <Stack p="md" spacing="xs">
                                <Group align="flex-start" className={styles.formSection}>
                                    <Stack style={{ flex: 1 }} spacing="xs">
                                        <TextInput
                                            label="First Name"
                                            placeholder="Your first name"
                                            required
                                            {...form.getInputProps('firstName')}
                                            className={styles.input}
                                        />
                                        <TextInput
                                            label="Last Name"
                                            placeholder="Your last name"
                                            required
                                            {...form.getInputProps('lastName')}
                                            className={styles.input}
                                        />
                                    </Stack>
                                    <Stack style={{ flex: 1 }} spacing="xs">
                                        <NumberInput
                                            label="Age"
                                            placeholder="Your age"
                                            min={18}
                                            max={120}
                                            required
                                            {...form.getInputProps('age')}
                                            className={styles.input}
                                        />
                                        <Select
                                            label="Gender"
                                            placeholder="Select gender"
                                            data={genderOptions}
                                            required
                                            {...form.getInputProps('gender')}
                                            className={styles.input}
                                        />
                                    </Stack>
                                </Group>

                                <TextInput
                                    label="Photo URL"
                                    placeholder="https://example.com/your-photo.jpg"
                                    {...form.getInputProps('photoUrl')}
                                    className={styles.input}
                                />

                                <MultiSelect
                                    label={`Skills (max ${MAX_SKILLS})`}
                                    placeholder="Select your skills"
                                    data={skillOptions}
                                    searchable
                                    clearable
                                    error={form.values.skills.length > MAX_SKILLS ? `Maximum ${MAX_SKILLS} skills allowed` : null}
                                    {...form.getInputProps('skills')}
                                    className={styles.input}
                                />

                                <Textarea
                                    label="About"
                                    placeholder="Tell us about yourself"
                                    minRows={2}
                                    maxRows={3}
                                    {...form.getInputProps('about')}
                                    className={styles.textarea}
                                />

                                {error && (
                                    <Alert color="red" title="Error" className={styles.errorAlert}>
                                        {error}
                                    </Alert>
                                )}

                                <Group mt="md" className={styles.buttonGroup}>
                                    <div className={styles.errorContainer}>
                                        {form.values.skills.length > MAX_SKILLS && (
                                            <Text size="sm" c="red" fw={500}>
                                                You've selected {form.values.skills.length} skills. Maximum allowed: {MAX_SKILLS}
                                            </Text>
                                        )}
                                    </div>
                                    <div>
                                        <Button
                                            variant="outline"
                                            onClick={() => setIsEditing(false)}
                                            className={styles.cancelButton}
                                            mr="sm"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            className={styles.saveButton}
                                            loading={isSubmitting}
                                            disabled={form.values.skills.length > MAX_SKILLS}
                                        >
                                            Save Changes
                                        </Button>
                                    </div>
                                </Group>
                            </Stack>
                        </form>
                    </Card>
                </ScrollArea>

                <div className={styles.previewContainer}>
                    <div className={styles.previewHeader}>
                        <Text fw={700} size="xl">Profile Preview</Text>
                        <Text size="sm" c="dimmed">This is how your profile will appear to others</Text>
                    </div>
                    <UserCard isPreview={true} user={previewData} />
                </div>
            </div>
        );
    }

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder className={styles.profileCard}>
            <Card.Section bg="blue.6" p="sm" className={styles.cardHeader}>
                <Group justify="space-between">
                    <Text c="white" fw={700} size="xl">Profile</Text>
                    <Button variant="white" onClick={handleEditClick} className={styles.editButton}>
                        Edit Profile
                    </Button>
                </Group>
            </Card.Section>

            <Group mt="md" align="flex-start">
                <Avatar
                    src={user?.photoUrl}
                    size={120}
                    radius="md"
                    alt={`${user?.firstName} ${user?.lastName}`}
                    className={styles.profileImage}
                />
                <Stack style={{ flex: 1 }} gap="xs" className={styles.userInfo}>
                    <Text fw={700} size="xl">{user?.firstName} {user?.lastName}</Text>
                    <Group gap="xs">
                        <Text size="sm" c="dimmed">Age:</Text>
                        <Text size="sm">{user?.age}</Text>
                    </Group>
                    <Group gap="xs">
                        <Text size="sm" c="dimmed">Gender:</Text>
                        <Text size="sm" tt="capitalize">{user?.gender}</Text>
                    </Group>
                    <Group gap="xs">
                        <Text size="sm" c="dimmed">Email:</Text>
                        <Text size="sm">{user?.email}</Text>
                    </Group>
                </Stack>
            </Group>

            <Divider my="md" />

            <Stack className={styles.section}>
                <Text fw={600}>About</Text>
                <Text size="sm">{user?.about || 'No information provided'}</Text>
            </Stack>

            <Divider my="md" />

            <Stack className={styles.section}>
                <Text fw={600}>Skills</Text>
                <Group gap="xs">
                    {user?.skills?.length > 0 ? (
                        user.skills.map((skill) => (
                            <Badge key={skill} size="lg" className={styles.skillBadge}>
                                {skill}
                            </Badge>
                        ))
                    ) : (
                        <Text size="sm" c="dimmed">No skills listed</Text>
                    )}
                </Group>
            </Stack>
        </Card>
    );
};

export default ProfileCard; 