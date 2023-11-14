import { ScrollView, StyleSheet, Text, TextInput, View, CheckBox, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { createStore } from 'redux'

const Redux = ({ route, navigation }) => {
    const [name, setName] = useState("")
    const [search, setSearch] = useState("")
    const [todoList, setTodoList] = useState([
        {
            job: "To check email",
            isChecked: true
        },
        {
            job: "UI task web page",
            isChecked: true
        },
        {
            job: "Learn javascript basic",
            isChecked: true
        },
        {
            job: "Learn HTML Advanced",
            isChecked: true
        },
        {
            job: "Medical App UI",
            isChecked: true
        },
        {
            job: "Learn Java",
            isChecked: true
        },
    ])

    useEffect(() => {
        setName(route.params.name)
    }, [route.params.name])

    useEffect(() => {
        if (route.params.job.job !== '') {
            store.dispatch({type : 'INSERT_JOB', job : route.params.job.job})
        }
    }, [JSON.stringify(route.params.job)])

    function jobReducer(state = todoList, action) {
        switch (action.type) {
            case 'INSERT_JOB':
                return [{ job: action.job, isChecked: false }, ...state]
            case 'UPDATE_JOB' :
                navigation.navigate("AddJob", { job: action.job, isUpdate: true })
                return state.filter(o => o.job !== action.job)
            default:
                return state
        }
    }

    let store = createStore(jobReducer)

    let handlePressAddJob = () => {
        navigation.navigate("AddJob")
    }

    store.subscribe(() => setTodoList(store.getState()))

    return (
        <View style={styles.containerTodoList}>
            <View style={styles.viewHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='chevron-back-circle-outline' size={30} />
                </TouchableOpacity>
                <View style={styles.viewUser}>
                    <Ionicons name='person-outline' size={30} />
                    <View style={styles.viewUserInfo}>
                        <Text style={{ fontSize: '20px', fontWeight: 'bold' }}>{`Hi ${name}`}</Text>
                        <Text style={{ fontSize: '15px', color: 'gray' }}>Have a great day a head</Text>
                    </View>
                </View>
            </View>
            <View style={styles.viewSearch}>
                <Ionicons name='search' size={25} style={{ width: '10%', marginLeft: '10px' }} />
                <TextInput placeholder='Search' style={{ height: '100%', width: '90%', outlineWidth: '0px' }}
                    value={search}
                    onChangeText={setSearch}
                />
            </View>
            <ScrollView style={styles.viewTodoList}>
                {
                    todoList.filter(o => o.job.includes(search)).map((job, index) => (
                        <View key={index} style={styles.jop}>
                            <View style={styles.viewCheckJob}>
                                <CheckBox
                                    value={job.isChecked}
                                    onValueChange={() => setTodoList(job.isChecked
                                        ? [{ job: job.job, isChecked: !job.isChecked }, ...todoList.filter(f => f.job !== job.job)]
                                        : [...todoList.filter(f => f.job !== job.job), { job: job.job, isChecked: !job.isChecked }]
                                    )}
                                />
                                <Text style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '10px' }}>{job.job}</Text>
                            </View>
                            <TouchableOpacity onPress={() => store.dispatch({type : 'UPDATE_JOB', job : job.job})}>
                                <Ionicons name='create-outline' size={30} />
                            </TouchableOpacity>
                        </View>
                    ))
                }
            </ScrollView>
            <TouchableOpacity style={styles.viewAddJob} onPress={handlePressAddJob}>
                <Ionicons name='add-circle' size={50} style={{ color: '#2c99ab' }} />
            </TouchableOpacity>
        </View>
    )
}

export default Redux

const styles = StyleSheet.create({
    containerTodoList: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '20px'
    },
    viewHeader: {
        width: '100%',
        height: '10%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    viewUser: {
        width: '70%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    viewSearch: {
        width: '100%',
        height: '60px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: '1px',
        borderColor: 'black',
        borderRadius: '10px',
        marginBottom: '40px',
        marginTop: '20px'
    },
    viewTodoList: {
        width: '100%',
    },
    jop: {
        width: '100%',
        height: '50px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: '1px',
        borderColor: 'black',
        borderRadius: '15px',
        paddingHorizontal: '10px',
        marginBottom: '20px'
    },
    viewCheckJob: {
        width: '70%',
        height: '50px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    viewAddJob: {
        width: '100%',
        height: '50px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '50px',
        marginBottom: '30px'
    }
})