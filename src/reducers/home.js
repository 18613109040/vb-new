import {TEST_GET} from 'actions/home'
export function testget(state={}, action) {
    let json = action.json;
    switch (action.type) {
        case TEST_GET:
        console.dir(json)
            return json
        default:
            return state
    }
}
