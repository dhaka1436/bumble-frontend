import { useState, useEffect } from 'react';
import { Card, Avatar, Text, Group, Badge, Button, Stack, TextInput, Textarea, NumberInput, MultiSelect, Select, Divider } from '@mantine/core';
import { useForm } from '@mantine/form';
import styles from './ProfileCard.module.scss';
import { useSelector } from 'react-redux';

const skillOptions = ['JavaScript', 'TypeScript', 'React', 'Angular', 'Vue', 'Node.js', 'Express', 'MongoDB', 'SQL', 'Python', 'Java', 'C#', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'GraphQL', 'REST API', 'HTML', 'CSS', 'SASS', 'Redux', 'MobX', 'Git', 'CI/CD', 'C++', 'Flutter'];

const genderOptions = [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }, { value: 'others', label: 'Others' }];

const ProfileCard = () => {
    const user = useSelector(state => state.user);
    const [isEditing, setIsEditing] = useState(false);

    // Initialize form with user data
    const form = useForm({ initialValues: { firstName: user?.firstName || '', lastName: user?.lastName || '', age: user?.age || 18, gender: user?.gender || '', photoUrl: user?.photoUrl || '', skills: user?.skills || [], about: user?.about || '' } });

    useEffect(() => {
        if (isEditing && user) {
            form.reset();
            form.setValues({ firstName: user.firstName || '', lastName: user.lastName || '', age: user.age || 18, gender: user.gender || '', photoUrl: user.photoUrl || '', skills: user.skills || [], about: user.about || '' });
        }
    }, [isEditing, user]);

    const handleEditClick = () => {

        if (user) {
            form.setValues({ ßfirstName: user.firstName || '', lastName: user.lastName || '', age: user.age || 18, gender: user.gender || '', photoUrl: user.photoUrl || '', skills: user.skills || [], about: user.about || '' });
        }
        setIsEditing(true);
    };

    const handleSubmit = (values) => {
        console.log('Updated values:', values);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <Card shadow="sm" padding="lg" radius="md" withBorder className={styles.editFormCard}>
                <Card.Section mb="md" className={styles.cardHeader}>
                    <div className={styles.headerContent}>
                        <Text fw={700} size="xl">Edit Profile</Text>
                    </div>
                </Card.Section>

                <form onSubmit={form.onSubmit(handleSubmit)}>
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
                            label="Skills"
                            placeholder="Select your skills"
                            data={skillOptions}
                            searchable
                            clearable
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

                        <Group justify="flex-end" mt="md" className={styles.buttonGroup}>
                            <Button variant="outline" onClick={() => setIsEditing(false)} className={styles.cancelButton}>Cancel</Button>
                            <Button type="submit" className={styles.saveButton}>Save Changes</Button>
                        </Group>
                    </Stack>
                </form>
            </Card>
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