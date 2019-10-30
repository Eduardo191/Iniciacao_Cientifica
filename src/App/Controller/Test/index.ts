import { Controller } from "../Controller";
import { TestInterface } from "./interface";
import { formData } from "./formData";
import { delay } from "../../Logic/Library";
import Axios from "axios";

export class Test extends Controller {

    private static form = formData;

    constructor(value: TestInterface) {
        super(value, "/tests");
    }

    public static getForm() {
        return Test.form;
    }

    public static async getTests() {
        delay(500);
        const tests: Array<TestInterface> = await Axios.get('/tests').then((response) => {
            return response.data;
        });
        return tests;
    }

    public static async editTestById(id: number) {
        delay(500);
        const test: TestInterface = await Axios.patch(`/tests/${id}`).then((response) => {
            return response.data;
        }); 
        return test;
    }

    public static async getTestById(id: number) {
        delay(500);
        const test: TestInterface = await Axios.get(`/tests/${id}`).then((response) => {
            return response.data;
        }); 
        return test;
    }

    public static async getTestByPeopleId(peopleId: number) {
        delay(500);
        const test: TestInterface = await Axios.get(`/tests/${peopleId}`).then((response) => {
            return response.data;
        }); 
        return test;
    }

    public static async getTestByTestTypeId(testTypeId: number) {
        delay(500);
        const test: TestInterface = await Axios.get(`/tests/${testTypeId}`).then((response) => {
            return response.data;
        }); 
        return test;
    }
}