import React, { useState } from "react";
import { createNewUser } from "../../actions/UserActions.js";
import {useNavigate} from 'react-router-dom';
import { Cookies } from 'react-cookie';


const CreateAccount = () => {
    const cookies = new Cookies();
    const [user, setUserData] = useState({
        "email": "",
        "password": "",
        "posts": []
    });
    const [comfirmPassword, setComfirmPassword] = useState({"password": ""})
    const [passwordsMatchCheck, setPasswordsMatchCheck] = useState(false)
    const [usedEmailCheck, setusedEmailCheck] = useState(false)
    const navigate = useNavigate()



    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(user)
        console.log(comfirmPassword)
        if (user["password"] !== comfirmPassword["password"]) {
            setPasswordsMatchCheck(true)
            return
        }
        else {
            setPasswordsMatchCheck(false)
        }
        var data = await createNewUser(user)
        if ("message" in data){
            if (data['message'] === "Request failed with status code 400") {
                setusedEmailCheck(true)
                return
            }
        }
        else {
            setusedEmailCheck(false)
        }
        
        console.log(data)
        cookies.set('user_data', data["newUserSchema"], { path: '/', maxAge: 172800 });
        cookies.set('user_token', data["token"], { path: '/', maxAge: 172800 });
        navigate("/")
    };



    return (
    <form onSubmit={handleSubmit} className=" bg-slate-800 text-white shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4 w-[98%] lg:w-[400px]">
        
        <div className="w-[100%] mt-2 flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className=" ml-8" data-name="Layer 1" width="50%" height="100%" viewBox="0 0 943.00108 795.62948" xmlnsXlink="http://www.w3.org/1999/xlink"><path d="M896.49946,436.18526q0,16.77-1.41,33.2-1.11007,12.825-3.03,25.42-2.04,13.335-5,26.35v.01q-1.935,8.565-4.25,16.99a378.35513,378.35513,0,0,1-16.67,47.92005q-2.16,5.08492-4.46,10.1a378.58454,378.58454,0,0,1-19.46,36.94,385.53425,385.53425,0,0,1-74.35,89.85q-4.74,4.215-9.61,8.29a382.42129,382.42129,0,0,1-245.76,88.93c-212.08,0-384-171.92-384-384,0-212.08,171.92-384,384-384a382.30565,382.30565,0,0,1,238.77,83.25q4.77,3.77994,9.42,7.73a386.731,386.731,0,0,1,42.23,41.8h.01A382.50488,382.50488,0,0,1,896.49946,436.18526Z" transform="translate(-128.49946 -52.18526)" fill="#f2f2f2"/><path d="M241.85571,502.51643c-36.5805-21.77185-64.19-62.46051-60.6056-104.87816a196.13326,196.13326,0,0,0,123.333,54.05479c17.8222,1.0533,37.75447.36912,50.87364,12.47827,8.16321,7.53444,11.96313,18.87789,12.58646,29.96883.62307,11.0915-1.59872,22.12366-3.80913,33.01055l.76073,2.66679C322.42586,529.97758,278.43621,524.28827,241.85571,502.51643Z" transform="translate(-128.49946 -52.18526)" fill="#e6e6e6"/><path d="M182.14218,397.59281a167.64108,167.64108,0,0,0,69.67824,76.04858c6.58713,3.68713,13.59014,6.85416,21.03209,8.3232a41.40533,41.40533,0,0,0,21.72339-1.72118c6.53413-2.20358,12.96265-5.21427,19.91865-5.79112,7.332-.608,14.11977,2.22066,19.45283,7.17513,6.52514,6.06194,10.483,14.107,14.08,22.1088,3.99382,8.88453,8.00139,18.17605,15.6587,24.56517.92779.77413-.32765,2.16848-1.254,1.39552-13.3224-11.116-15.497-29.73205-26.14624-42.82372-4.96915-6.10882-11.80937-10.75713-19.93537-10.63454-7.10584.1072-13.73764,3.20618-20.3343,5.49453-6.92661,2.4028-13.86547,3.53152-21.17809,2.47435-7.4804-1.08142-14.622-3.98133-21.2745-7.48388a162.642,162.642,0,0,1-40.498-30.72269A170.61394,170.61394,0,0,1,180.355,398.16487c-.50063-1.09535,1.28981-1.66025,1.78717-.57206Z" transform="translate(-128.49946 -52.18526)" fill="#fff"/><path d="M241.62442,468.62037a25.15151,25.15151,0,0,1-31.817,6.95644c-1.06374-.57069-.22689-2.25049.83826-1.67905a23.28975,23.28975,0,0,0,29.5832-6.53143c.72731-.9636,2.11867.296,1.39552,1.254Z" transform="translate(-128.49946 -52.18526)" fill="#fff"/><path d="M291.41,481.79705a48.47753,48.47753,0,0,0-16.879-31.036c-.925-.77739.33013-2.172,1.254-1.39552A50.42392,50.42392,0,0,1,293.28351,481.697c.14751,1.20061-1.72681,1.29413-1.87352.1Z" transform="translate(-128.49946 -52.18526)" fill="#fff"/><path d="M201.84064,431.15693a14.237,14.237,0,0,0,4.78953-12.63167c-.16266-1.19814,1.71192-1.29039,1.87352-.1a15.95369,15.95369,0,0,1-5.26753,13.98575.96962.96962,0,0,1-1.32478.07074.94283.94283,0,0,1-.07074-1.32478Z" transform="translate(-128.49946 -52.18526)" fill="#fff"/><path d="M299.65851,315.46042c.12285.74525.24569,1.49051.38274,2.24283a187.49262,187.49262,0,0,0,7.51687,29.47055c.24331.74656.50113,1.49949.76538,2.23751a197.65952,197.65952,0,0,0,36.58364,62.90818,191.95179,191.95179,0,0,0,20.69372,20.55182c10.23277,8.72195,22.02167,17.36458,28.5824,28.62608a32.93,32.93,0,0,1,1.87051,3.621L368.1892,528.68258c-.13582.11267-.25752.23239-.39365.34577l-.9965,2.58879c-.40487-.299-.81836-.61791-1.22323-.917-.23558-.17249-.465-.35915-.70053-.53165-.15509-.11948-.31-.23971-.45673-.33866-.05177-.03958-.10323-.07987-.14057-.11312-.14678-.099-.27261-.20646-.40487-.29905q-3.47431-2.664-6.92326-5.386c-.01452-.00636-.01452-.00636-.02283-.02689-17.48426-13.872-33.964-29.32552-47.57436-46.78908-.40931-.52555-.83344-1.05676-1.23-1.61134a183.1673,183.1673,0,0,1-16.25037-25.08748,161.92786,161.92786,0,0,1-6.9679-14.82863,134.65273,134.65273,0,0,1-9.58841-40.99451c-2.043-28.07473,4.91554-56.49033,22.9489-77.63158C298.72657,316.52164,299.18229,315.99456,299.65851,315.46042Z" transform="translate(-128.49946 -52.18526)" fill="#e6e6e6"/><path d="M300.40263,315.957a167.64112,167.64112,0,0,0,9.84767,102.67164c3.03955,6.90988,6.7243,13.65486,11.78181,19.30839a41.40533,41.40533,0,0,0,18.38118,11.7047c6.54384,2.17457,13.4893,3.64111,19.39058,7.36852,6.22026,3.92888,9.93686,10.27415,11.21207,17.44089,1.56025,8.7687-.12328,17.57509-2.06892,26.12979-2.16025,9.49835-4.55457,19.32995-2.28733,29.04152.27471,1.17669-1.56718,1.53414-1.84148.35923-3.94461-16.89648,5.52729-33.06962,4.90653-49.93419-.28966-7.86932-2.95259-15.699-9.51455-20.49355-5.73815-4.19261-12.89908-5.711-19.54388-7.85558-6.97717-2.25179-13.197-5.52825-18.39925-10.775-5.3216-5.36717-9.27781-11.98231-12.48069-18.78418a162.64177,162.64177,0,0,1-13.83823-48.913,170.61412,170.61412,0,0,1,2.68312-57.88843c.25974-1.176,2.02942-.54906,1.77137.61925Z" transform="translate(-128.49946 -52.18526)" fill="#fff"/><path d="M305.13237,408.48092A25.15152,25.15152,0,0,1,275.54,394.87923c-.50575-1.09611,1.17378-1.9335,1.6802-.83594a23.28974,23.28974,0,0,0,27.5529,12.59615c1.16087-.33149,1.51346,1.51189.35923,1.84148Z" transform="translate(-128.49946 -52.18526)" fill="#fff"/><path d="M336.95008,448.97612a48.47749,48.47749,0,0,0,5.20888-34.94288c-.27053-1.17763,1.57127-1.53543,1.84148-.35923a50.42393,50.42393,0,0,1-5.49422,36.35021c-.60507,1.04743-2.15792-.00636-1.55614-1.0481Z" transform="translate(-128.49946 -52.18526)" fill="#fff"/><path d="M295.92282,354.61588a14.237,14.237,0,0,0,11.42931-7.202c.59149-1.05458,2.14378.00039,1.55613,1.04811a15.95371,15.95371,0,0,1-12.62621,7.99542.96961.96961,0,0,1-1.10035-.74113.94283.94283,0,0,1,.74112-1.10035Z" transform="translate(-128.49946 -52.18526)" fill="#fff"/><path d="M394.49946,141.18526l47,550.19219-94,7.06765V148.18526C358.70048,140.77358,374.77921,139.614,394.49946,141.18526Z" transform="translate(-128.49946 -52.18526)" fill="#ccc"/><path d="M626.49946,141.18526l-47,550.19219,94,7.06765V148.18526C662.29844,140.77358,646.2197,139.614,626.49946,141.18526Z" transform="translate(-128.49946 -52.18526)" fill="#ccc"/><path d="M659.42475,721.18526H360.57417a18.09544,18.09544,0,0,1-18.07471-18.07519V156.26a18.09533,18.09533,0,0,1,18.07471-18.07471H659.42475A18.09533,18.09533,0,0,1,677.49946,156.26v546.8501A18.09544,18.09544,0,0,1,659.42475,721.18526Zm-298.85058-577A12.08814,12.08814,0,0,0,348.49946,156.26v546.8501a12.08855,12.08855,0,0,0,12.07471,12.07519H659.42475a12.08856,12.08856,0,0,0,12.07471-12.07519V156.26a12.08814,12.08814,0,0,0-12.07471-12.07471Z" transform="translate(-128.49946 -52.18526)" fill="#ccc"/><rect x="217" y="177" width="329" height="6" fill="#ccc"/><rect x="217" y="277" width="329" height="6" fill="#ccc"/><rect x="317.76367" y="89" width="6" height="273" fill="#ccc"/><rect x="439.23633" y="89" width="6" height="273" fill="#ccc"/><path d="M711.99946,737.68526h-394a27,27,0,0,1,0-54h394a27,27,0,0,1,0,54Z" transform="translate(-128.49946 -52.18526)" fill="#ccc"/><rect x="219" y="348" width="327" height="20" fill="#ccc"/><path d="M453.19434,463.83594l-.415-.2002c-22.29151-10.76855-51.48291-10.75879-94.65332.03516l-.46094.11523-.13818-.45508c-4.5669-14.97412-9.74024-31.93408-.02149-40.27832.13623-24.48535,21.61426-44.36767,47.99561-44.36767,26.376,0,47.85107,19.87207,47.99511,44.35107,14.45752,11.05371,7.56739,27.38819-.06836,40.40235Z" transform="translate(-128.49946 -52.18526)" fill="#2f2e41"/><path d="M590.20566,411.40544a13.84439,13.84439,0,0,1-18.64664,10.147l-78.7775,79.16467L485.753,476.13619,563.99364,402.621a13.91943,13.91943,0,0,1,26.212,8.78448Z" transform="translate(-128.49946 -52.18526)" fill="#ffb6b6"/><path d="M395.50744,487.61758s-7.14729,16.19679,10.48838,26.18518,79.27274-3.81153,89.274-5.73838S542.62493,450.237,542.62493,450.237l-5.282-27.41494-49.53991,43.00485Z" transform="translate(-128.49946 -52.18526)" fill="#6c63ff"/><path d="M382.49946,577.18526l1,19s-2.95156,16.83046-.5241,20.46245c2.40918,3.61383,68.15044,4.07012,68.15044,4.07012s4.34382-23.41646,8.08532-43.91265Z" transform="translate(-128.49946 -52.18526)" fill="#ffb6b6"/><polygon points="443.014 776.221 456.758 773.445 452.824 717.931 432.54 722.028 443.014 776.221" fill="#ffb6b6"/><polygon points="462.701 703.978 475.478 698.233 458.903 645.117 440.045 653.597 462.701 703.978" fill="#ffb6b6"/><path d="M602.33005,726.23486l-24.0579,13.62222-59.332-95.342c-41.65145,28.061-82.38133,41.49927-123.44064,48.6702-13.882,2.47175-28.0355,1.21914-30.70059-12.91q-.18689-.99079-.298-1.9926c-1.6393-15.43316,17.5583-35.21508,19.99859-54.09737l52.54046-3.154,6.479,8.307L504.28023,591.982c12.21929-7.51246,28.29076-3.44911,35.89664,9.07572q.60238.992,1.11848,2.03317Z" transform="translate(-128.49946 -52.18526)" fill="#2f2e41"/><path d="M587.6052,790.37233l-27.5282,2.5583-49.91315-102.081c-49.49549,8.51244-96.19,11.23939-136.57873.94186-13.67464-3.43841-22.03353-17.55828-18.67008-31.53767q.23582-.98018.54535-1.93955c4.83376-14.748,17.48681-25.183,27.45579-41.40388L455.733,618.0165l-8.13312,28.06226,70.73646-9.15352c14.22531-1.84079,27.217,8.45582,29.01765,22.99812q.14259,1.15179.18634,2.313Z" transform="translate(-128.49946 -52.18526)" fill="#2f2e41"/><circle cx="282.43225" cy="367.56976" r="29.56777" fill="#ffb6b6"/><path d="M393.59763,459.99679l27.1109,3.18952a5.53217,5.53217,0,0,1,4.75822,4.31316l4.31148,19.72906,26.87663,31.65059s9.6511,18.0959,6.032,38.60463-5.20962,35.74761-5.20962,35.74761S385.38114,620.2632,382.96836,616.644s-3.1958-20.0584-3.1958-20.0584L370.12145,489.2165S380.979,471.12059,387.011,471.12059C390.904,470.98933,390.40455,462.2276,393.59763,459.99679Z" transform="translate(-128.49946 -52.18526)" fill="#6c63ff"/><ellipse cx="329.71072" cy="539.38696" rx="6.8838" ry="8.26056" fill="#6c63ff"/><path d="M564.6931,814.11275l20.95356-10.501,3.9492,9.21313,26.49649,5.35611a6.26128,6.26128,0,0,1,1.22668,11.89231l-25.601,10.97385-8.31908-7.22169,2.18342,9.85173-9.6526,4.13758Z" transform="translate(-128.49946 -52.18526)" fill="#2f2e41"/><path d="M585.20373,751.74381l20.76563-10.86793,4.11062,9.14225,26.5866,4.88927a6.26129,6.26129,0,0,1,1.43564,11.86891l-25.404,11.4224-8.44481-7.07426,2.35635,9.81181-9.57833,4.3067Z" transform="translate(-128.49946 -52.18526)" fill="#2f2e41"/><path d="M394.03857,410.48047a37.83844,37.83844,0,0,1-21.82568-6.88574l-.21338-.14942v-.26025a28.53242,28.53242,0,0,1,28.5-28.5h12a28.53241,28.53241,0,0,1,28.5,28.5,6.63572,6.63572,0,0,1-6.49023,6.60351l-39.79639.686C394.48828,410.47852,394.2627,410.48047,394.03857,410.48047Z" transform="translate(-128.49946 -52.18526)" fill="#2f2e41"/><ellipse cx="437.49946" cy="388.18526" rx="8" ry="11" transform="translate(-263.97828 218.57143) rotate(-30)" fill="#2f2e41"/><ellipse cx="377.49955" cy="386.18526" rx="11" ry="8" transform="translate(-291.00662 327.85827) rotate(-45)" fill="#2f2e41"/><path d="M644.8378,662.18526H615.3251a4.57,4.57,0,0,0-3.49853,1.61737,6.999,6.999,0,1,0,1.80566,13.1731l2.44776,7.95416a4.6111,4.6111,0,0,0,4.40771,3.25537h19.188a4.611,4.611,0,0,0,4.40723-3.25537l5.16259-16.77692A4.61179,4.61179,0,0,0,644.8378,662.18526Zm-34.25635,13.5a5,5,0,1,1,0-10c.09131,0,.17627.0221.2666.02692a4.56354,4.56354,0,0,0,.06983,2.44079l2.11181,6.86475A4.9367,4.9367,0,0,1,610.58145,675.68526Z" transform="translate(-128.49946 -52.18526)" fill="#3f3d56"/><path d="M513.05185,640.47774a13.8444,13.8444,0,0,1-15.07039-14.95132L399.5427,572.77463,421.07356,558.989l92.8728,53.85838a13.91943,13.91943,0,0,1-.89451,27.63037Z" transform="translate(-128.49946 -52.18526)" fill="#ffb6b6"/><path d="M384.182,475.83189s-17.56648-2.19967-22.075,17.56034,26.39586,74.8462,31.1112,83.87408,68.983,28.77257,68.983,28.77257l24.74683-12.92565-55.41052-35.11829Z" transform="translate(-128.49946 -52.18526)" fill="#6c63ff"/><path d="M379.5,342h6a11,11,0,0,1,11,11v0a0,0,0,0,1,0,0h-28a0,0,0,0,1,0,0v0A11,11,0,0,1,379.5,342Z" fill="#ccc"/><circle cx="189.2416" cy="77.32369" r="59.44187" fill="#ff6584"/><path d="M499.73783,126.41124c-15.7312-16.50248-34.00131-31.55708-55.62979-39.51246a89.414,89.414,0,0,0-18.6325-4.68231c-.05115-.007-.09959.00335-.15045-.00078a2.74577,2.74577,0,0,0-.31429-.06168,71.72506,71.72506,0,0,0-26.62216,1.60723A73.55438,73.55438,0,0,0,385.993,88.07939a108.39914,108.39914,0,0,0-11.63129,6.59173,75.65263,75.65263,0,0,1-25.70256,9.58857,86.46775,86.46775,0,0,1-13.80457,1.35489c-4.01773.0806-7.80669.22017-11.61329,1.67168a27.87432,27.87432,0,0,0-16.97583,18.381,1.80745,1.80745,0,0,0,.80343,1.97437c1.02972.73748,2.03355,1.57421,3.11542,2.23124a9.71934,9.71934,0,0,0,3.04315.83q2.58008.54443,5.16669,1.057,9.52917,1.88808,19.1375,3.34264,19.44216,2.9432,39.09431,4.14643a435.30343,435.30343,0,0,0,78.685-2.36485,436.80225,436.80225,0,0,0,43.65533-7.55074A1.76448,1.76448,0,0,0,499.73783,126.41124Z" transform="translate(-128.49946 -52.18526)" fill="#e6e6e6"/><path d="M320.56218,166.15461a89.414,89.414,0,0,0-18.63249-4.68231c-.05115-.007-.09959.00335-.15046-.00078a2.74708,2.74708,0,0,0-.31429-.06168,71.72508,71.72508,0,0,0-26.62216,1.60723,73.55459,73.55459,0,0,0-12.3956,4.31815,108.40025,108.40025,0,0,0-11.6313,6.59173,75.65258,75.65258,0,0,1-25.70255,9.58857,86.46786,86.46786,0,0,1-13.80457,1.35489c-4.01774.0806-7.8067.22018-11.6133,1.67168A27.87437,27.87437,0,0,0,182.71963,204.923a1.80746,1.80746,0,0,0,.80344,1.97437c1.02972.73749,2.03355,1.57421,3.11542,2.23124a9.71928,9.71928,0,0,0,3.04314.83q2.58007.54443,5.1667,1.057,9.52915,1.88808,19.1375,3.34264,19.44216,2.94319,39.09431,4.14643a435.30343,435.30343,0,0,0,78.685-2.36485,436.80324,436.80324,0,0,0,43.65533-7.55074,1.76448,1.76448,0,0,0,.77149-2.92207C360.46078,189.16459,342.19066,174.11,320.56218,166.15461Z" transform="translate(-128.49946 -52.18526)" fill="#e6e6e6"/><polygon points="620.723 557.099 575.011 497.048 538.943 517.442 615.374 608.204 620.723 557.099" fill="#3f3d56"/><path d="M854.51948,511.66524a329.3367,329.3367,0,0,0,11.62,74.41q-2.16,5.08492-4.46,10.1a378.58454,378.58454,0,0,1-19.46,36.94,385.53425,385.53425,0,0,1-74.35,89.85q-4.74,4.215-9.61,8.29c-18.51-25.52-28.5-53.68-32.45-82.66-.5-3.68-.91-7.4-1.22-11.1v-.02a236.75894,236.75894,0,0,1-.73-27.04c.01-.72.03-1.45.06-2.18.35-9.64,1.22-19.3,2.53-28.87v-.01c.15-1.1.3-2.2.47-3.3.48-3.30005,1.02-6.6,1.61005-9.88a400.20768,400.20768,0,0,1,14.34-55.79v-.01c.17-.53.34-1.05.53-1.56994.66-1.98005,1.33-3.94,2.02-5.9a3.43549,3.43549,0,0,1,.16-.45q1.33492-3.84,2.73-7.62.375-1.05.78-2.1c1.05-2.81,2.12-5.6,3.21-8.35.34-.88.69-1.76,1.04-2.63.27-.67.53-1.34.81-2v-.01q2.385-5.895,4.83-11.56c4.57-10.62,9.27-20.61,13.85-29.82l.01-.01c19.01-38.13,36.29-62.89,36.29-62.89l64.89,21c-7.74,13.73-13.73,33.98-17.01,57.87a323.06661,323.06661,0,0,0-2.49,57.3Z" transform="translate(-128.49946 -52.18526)" fill="#3f3d56"/><path d="M746.66944,505.55526c-.38-.89-.81-1.76-1.25-2.63a49.25724,49.25724,0,0,0-8.71-12c-.52-.53-1.06-1.06-1.62-1.56a48.71775,48.71775,0,0,0-45.48-11.26l-.04.02-.3.08.07.34a28.2805,28.2805,0,0,0,1.3,4.65c.15.41.32.8.49,1.19.07.18.16.34.24.52,0,0-.01.01.01.01,0,.01.01.02.01.03.19.37.37.75.57,1.11-.41-.39-.8-.79-1.18-1.2-.37006-.38-.71-.78-1.05005-1.18a33.14713,33.14713,0,0,1-3.15-4.34l-.16-.26995-.28.11a49.113,49.113,0,0,0-10.72,5.25l-.36.24a21.80194,21.80194,0,0,1-17.51,2.86,34.71835,34.71835,0,0,0-27.59,4.51,34.303,34.303,0,0,0-7.18,6.26c-.18006.21-.36005.43-.54.64-.38.46-.74.93-1.09,1.41a34.2634,34.2634,0,0,0-6.67,17.23005l-.02.23.19.13a29.71386,29.71386,0,0,0,11.24,4.68,33.63049,33.63049,0,0,1-7.64.19h-.01a30.941,30.941,0,0,1-3.44-.48l-.21-.04h-.01l-.26-.05.04.48a34.39863,34.39863,0,0,0,5.57,17.15l.1.14a1.40671,1.40671,0,0,1,.1.16,35.99726,35.99726,0,0,1,3.52,6.91,32.9178,32.9178,0,0,1,1.48,18.91,34.48047,34.48047,0,0,0,14.12,36.18,34.29564,34.29564,0,0,0,16.95,5.95c.83.07,1.67.11,2.51.11a34.47892,34.47892,0,0,0,13.97-2.91l.16-.06.04-.18a33.84051,33.84051,0,0,1,3.54-7.78,23.57451,23.57451,0,0,0-.74,5.87v.66l.57-.33c.49-.29.99-.6,1.44-.89a35.22572,35.22572,0,0,0,7.27-6.32c.83-.96,1.67-1.89,2.55-2.82l.01-.01c1.71-1.82,3.52-3.6,5.4-5.3a100.97265,100.97265,0,0,1,12.8-9.77,110.30691,110.30691,0,0,1,14.13-7.68h.01c.55-.26,1.11-.51,1.66-.75a48.74065,48.74065,0,0,0,7.01-3.76c.07995-.05005.15-.09.22-.14a48.79243,48.79243,0,0,0,17.92-60.5Z" transform="translate(-128.49946 -52.18526)" fill="#6c63ff"/><path d="M626.77694,580.18364a34.46035,34.46035,0,0,0-.61934,3.68371,34.92932,34.92932,0,0,1-.782-18.17648c.20822-.92135.3642-1.85343.48647-2.7905A32.78043,32.78043,0,0,1,626.77694,580.18364Z" transform="translate(-128.49946 -52.18526)" opacity="0.15"/><path d="M627.53324,536.80588a33.63135,33.63135,0,0,1-8.93169.04258,34.58646,34.58646,0,0,1-2.00672-4.54481A29.30539,29.30539,0,0,0,627.53324,536.80588Z" transform="translate(-128.49946 -52.18526)" opacity="0.15"/><path d="M618.364,522.48392a34.76139,34.76139,0,0,0-2.16135,8.70514,34.36229,34.36229,0,0,1-1.6021-8.7684l-.02452-.48033.47188.09153A33.39679,33.39679,0,0,0,618.364,522.48392Z" transform="translate(-128.49946 -52.18526)" opacity="0.15"/><path d="M630.21729,491.73824a34.63169,34.63169,0,0,1,27.57441-4.5156,21.76593,21.76593,0,0,0,17.51959-2.85549l.361-.238a48.96512,48.96512,0,0,1,10.7142-5.26243l.288-.09956.15749.26038a33.1205,33.1205,0,0,0,5.37606,6.72523,25.39838,25.39838,0,0,1-2.6181-7.51049l-.068-.34613.3412-.09036a48.72054,48.72054,0,0,1,61.11632,49.7002,48.72953,48.72953,0,0,0-59.715-35.20742l-.3412.09036.068.34612a25.39856,25.39856,0,0,0,2.6181,7.51049,33.12057,33.12057,0,0,1-5.37606-6.72523l-.15749-.26038-.288.09957a48.96407,48.96407,0,0,0-10.71421,5.26243l-.361.238a21.76593,21.76593,0,0,1-17.51959,2.85549,34.55639,34.55639,0,0,0-39.7997,18.42636,41.88142,41.88142,0,0,1-4.49326-2.5103l-.196-.12419.02318-.23043A34.41763,34.41763,0,0,1,630.21729,491.73824Z" transform="translate(-128.49946 -52.18526)" opacity="0.15"/><path d="M1001.97944,236.22524l-.94995-.63-.68994.9a81.82985,81.82985,0,0,0-12.59009,22.29,106.75248,106.75248,0,0,1,4.82007-27.29l.29992-.93-.86-.49a157.68874,157.68874,0,0,0-35.5-14.72l-1.35-.36a70.06147,70.06147,0,0,1-44.15-36.28,111.36751,111.36751,0,0,0-111.43-60.49h-.01c-.24.02-.49.05-.73.08-.41.04-.81.09-1.21.14-.82.11-1.62.22-2.42.34-.68.1-1.37.21-2.05.33-.36.05-.71.11-1.06.18-.35.06-.71.12-1.06.19h-.01a110.25362,110.25362,0,0,0-19.66,5.65h-.01v.00995l-1.61.63q-2.49,1.02-4.94,2.16c-.37.17-.73.35-1.1.52-.1.05-.21.1-.31.16-1.05005.5-2.09,1.02-3.12,1.57-.15.07-.30005.15-.45.23l-.96.51q-3.165,1.71-6.22,3.63c-.17.1-.33.2-.5.31-.18005.12-.37.24-.55005.36-.11.06-.22.14-.32995.21-.31.19-.61005.39-.91.6-.6.39-1.2.79-1.79,1.2-.61.41-1.21.84-1.81,1.27l-.6.43.11005.74c.1.61.19,1.22.3,1.82.1.6.2,1.19.31,1.78.17.99.36,1.97.55,2.92.13.63.25,1.25.39,1.86q.195.945.42,1.89c.29,1.3.6,2.56.93,3.8.16.62.33,1.24.51,1.85.1.37.2.74.31,1.1q.12.375.24.75c.02.08.04.17.07.26a2.40607,2.40607,0,0,0,.08.25q.165.55509.33,1.08c.06.19.12.38.19.56.14.43.29.87.44,1.29.16.48.33.96.5,1.43.04.12.08.23.12.35.03.09.06.18.1.27.04.1.08.21.12.31.17.45.34.91.52,1.36.06.16.12.33.19.49a71.63483,71.63483,0,0,0,5.95,11.7q-3.885-3.33-7.48-7.06a107.6581,107.6581,0,0,1-10.2-12.31c-.25-.34-.5-.69-.73-1.04-.47-.67-.93-1.34-1.38-2.02-.48-.7-.94-1.43-1.39-2.15-.3-.48-.6-.97-.88995-1.45-.29-.46-.56-.91-.82-1.37l-.78-1.34h-.01v.01l-1.1,1.07995c-.44.43006-.88.86005-1.31,1.29a111.1344,111.1344,0,0,0-28.27,48.65l-.15.55-.15.57c-.29,1.02-.58,2.01-.89,3.02v.01c-.3,1-.62,2-.96,2.98-.31.93-.63,1.85-.97,2.77q-.165.465-.36.93c-.21.6-.44,1.19-.67,1.79-.11005.27-.22.55-.33.82-.27.66-.54,1.32-.81,1.97-.04.1-.09.21-.14.31-.08.2-.17.4-.25.59-.21.48-.43.97-.64,1.45-.15.31-.29.63-.43.94-.06.14-.13.28-.19.42-.37.8-.75,1.59-1.15,2.37006-.45.92-.91,1.84-1.4,2.74-.43.84-.88,1.66-1.35,2.48-.81,1.45-1.66,2.89-2.54,4.29-.34.54-.68,1.08-1.03,1.62-.08.13-.16.26-.24.38-.29.47-.59.92005-.9,1.38-.21.31-.42.62-.63.92-.35.54-.72,1.06-1.1,1.57-.1.16-.21.31-.32.46-.56.78-1.12,1.54-1.69,2.3-.02.01-.02.02-.03.03-.02,0-.02.01-.03.02-.25.33-.5.66-.76.98-.34.47-.71.93-1.08,1.38-.6.76-1.23,1.53-1.87,2.28-.02.02-.03.04-.05.05a106.52848,106.52848,0,0,1-10.74,10.92c-.07.06-.12.12-.19.17-.54.47-1.08.94-1.64,1.4q-.345.285-.69.57c-.38.32-.77.64-1.15.93a.79251.79251,0,0,1-.15.12c-.34.28-.67.54-1.01.8-.41.33-.82.64-1.24.95q-2.97,2.25-6.1,4.25c-.31.21-.64.42-.96.62-.19.12-.38.24-.56.34-.76.47-1.52.93-2.28,1.37-.76.45-1.54.88-2.31,1.3-1.65.9-3.28,1.84-4.87,2.82-.8.5-1.6,1-2.39,1.51q-4.71,3.06006-9.07,6.55a110.73687,110.73687,0,0,0-8.35,7.41q-.49494.48-.99.99c-.66.65-1.3,1.31-1.91,1.97-.98,1.01-1.92005,2.05-2.85,3.1a112.39814,112.39814,0,0,0-12.96,18.02,105.92614,105.92614,0,0,0-5.08,9.88995c-1.15,2.53-2.2,5.12006-3.15,7.74q-.945,2.625-1.77,5.3c-.27.89-.53,1.79-.78,2.69-.85,3.05-1.56,6.13-2.14,9.22q-.705,3.72006-1.14,7.45c-.15,1.25-.27,2.5-.38,3.74q-.38626,4.5716-.39453,9.15223a111.31038,111.31038,0,0,0,3.31451,27.17779q.735,2.94,1.63,5.85c.3.97.62,1.93.94,2.89q1.215,3.6,2.69,7.13.885,2.115,1.86,4.2a111.61617,111.61617,0,0,0,15.68,24.56q1.545,1.845,3.19,3.63c.01,0,0,.01,0,.01a110.89866,110.89866,0,0,0,8.63,8.44h.01q1.815,1.60492,3.69,3.11c.01-.01.01,0,.01,0,1.26,1.02,2.53,2,3.82995,2.95q.975.705,1.98005,1.41,1.965,1.395,4.01,2.69h.01q2.04008,1.32,4.14,2.52c2.81,1.61,5.69,3.12,8.65,4.49l.5.23.51-.23a109.4607,109.4607,0,0,1,14.64-5.37c1.1-.32,2.21-.61,3.31-.89q4.17-1.035,8.4-1.74a69.10112,69.10112,0,0,0-7.94,4.67c-1.97,1.33-3.91,2.78-5.86,4.38-.65.53-1.3,1.08-1.95,1.64l-1.62,1.4,2.03.67005c.74.24,1.48.48,2.22.7,1.01.32,2.01.61,2.99.88q3.21.90006,6.46,1.59c.53.11,1.05.22,1.58.33,1.03.2,2.07.4,3.11005.57995a.687.687,0,0,0,.13.02c1.08.18,2.17.35,3.25.5q3.01492.435,6.03.69c.22.03.44.04.67.05.49.04.97.08,1.46.11,1.08.07,2.17.12,3.26.16.08,0,.15.01.23.01.55.02,1.1.04,1.65.05,0,0,0,.01.01,0,.55.01,1.1.02,1.65.02h3.04c.56995,0,1.14.01,1.72.01.8,0,1.61.01,2.41.02.21,0,.43.01.65.01,1.28.02,2.56.05,3.84.08.07995,0,.16.01.24.01,1.28.04,2.56.08,3.84.14.28.01.56.02.85.04q1.845.075,3.69.18c.35.02.71.05,1.07.07.93.05,1.87.11,2.8.18.55.03,1.09.07,1.64.12,2.22.17,4.43.36,6.65.58.74.06,1.48.13995,2.22.22q2.97.315,5.96.69c.89.1,1.78.22,2.67.34.1.01.19995.02.3.04,1.1.15,2.19.3,3.29.46.72.1,1.44.21,2.16.32.74.11,1.48.22,2.22.35.4.06.8.13,1.21.2.96.15,1.93.31,2.9.49a2.34757,2.34757,0,0,1,.26.04c2.06.36,4.13.74,6.19,1.15,1.21.23,2.41.47,3.61.72.94.19,1.88.39,2.82.59.16.03.32.07.48.11a.5149.5149,0,0,0,.11.02c1.42.31,2.85.63,4.27.97q7.39508,1.71,14.77,3.8c1.13.31,2.26.64,3.39.97.48.14.95.28,1.42.42.98.29,1.95.58,2.93.89.86.26,1.73.53,2.59.81.54.17,1.08.34,1.62.52.84.26,1.68.53,2.51.82.71.22,1.41.45,2.11.7,1,.33,2.01.67005,3.01,1.03.29.1.59.2.88.31,1.22.42,2.44.85,3.66,1.3,1.19.43,2.38.87,3.56,1.31.82.31,1.64.61,2.45.93.91.35,1.82.7,2.72,1.06,1.3.51,2.61,1.03,3.91,1.56,1.2.48005,2.39.97,3.59,1.48005.22.09.45.18.67.28,1.04.43,2.08.88,3.11,1.33.67.28,1.33.57,1.99.86q4.32,1.89,8.63,3.91h.01c1.8.85,3.63,1.66,5.47,2.43.43005.18.86005.36,1.30005.53.73.31,1.47.6,2.21.9.48.19.96.38,1.45.56.71.28,1.43.55,2.15.81.76.28,1.51.56,2.28.82.27.1.54.19.82.29.89.3,1.78.6,2.68.89.09.03.18.06.28.09.94.30005,1.88.6,2.83.88a2.00224,2.00224,0,0,0,.23.07c1.02.31,2.06.61005,3.09.9,1.52.42,3.05.82,4.58,1.19.28.07.56.14.84.2.82.2,1.63.38995,2.45.57.87006.19995,1.75.37994,2.62006.56.87994.18,1.76.36,2.62994.52.47.09.94.18,1.4.26l1.23.21c.85.15,1.7.28,2.56.42a.195.195,0,0,1,.07.01c.97.15,1.93.29,2.9.41.93.13,1.86.24,2.79.35.19.01995.39.04.59.06.77.09,1.54.18,2.31.25q.33.02994.66.06c.76.07,1.52.14,2.28.19a3.55936,3.55936,0,0,0,.46.03c.68.06,1.36005.11,2.04.14.48.04.95.06,1.43.09.25.01.49.02.74.03.66.04,1.32.06,1.99.08.81.03,1.62.05,2.42005.07.97.01995,1.94995.03,2.92.03h.02c.95,0,1.91-.01,2.86005-.03h.36l1.05-.03c.54-.01,1.08-.03,1.61-.05,1.02-.04,2.03-.09,3.04-.15.4-.01995.81-.05,1.21-.07.18006-.01.37-.03.55005-.04.63-.04,1.25-.08,1.88-.13.65-.05,1.31-.11,1.96-.18.84-.08,1.68-.17,2.52-.26.66-.07,1.32-.15,1.97-.23a2.03236,2.03236,0,0,0,.26-.04c.63-.07,1.26-.15,1.88-.24.74-.1,1.47-.21,2.2-.31994.08-.01.15-.02.23-.03,1.26-.2,2.53-.4,3.8-.63,1.33-.24,2.66-.5,3.98005-.77.49-.1.97-.21,1.46-.31.27-.06.55-.11.81-.17.41-.09.81-.18,1.21-.28.07-.01.15-.03.22-.04.56-.12,1.11-.26,1.67-.4,1.12-.27,2.22-.55005,3.32-.85.49-.12.98-.25,1.44995-.38.14-.04.28-.08.41-.12q3.045-.855,6.04-1.81c.88-.28,1.75-.57,2.62-.88q2.805-.96,5.56-2.02c.49012-.18.98011-.38,1.4701-.57.72-.29,1.43994-.58,2.1499-.87.64-.27,1.28-.54,1.93005-.82.31995-.13.64-.27.96-.41.96009-.42,1.92005-.85,2.87-1.28.64-.3,1.27-.59,1.9-.89,1-.48,1.99-.97,2.98-1.46.25-.13.49-.25994.73011-.38.62988-.32,1.25988-.65,1.8999-.97,1.01-.54,2.02-1.08,3.02-1.64.34-.18.66992-.37,1.01-.56q1.65-.93,3.27-1.89,3.58483-2.145,7.06994-4.48c.58-.38,1.16-.78,1.73011-1.17,1.07983-.74,2.13989-1.5,3.19995-2.26.11-.08.21-.16.31994-.23.53-.39,1.05994-.78,1.59-1.18,1.1001-.83,2.19006-1.67005,3.28-2.53.02-.01.05005-.04.08008-.06.49-.39.98-.78,1.46-1.17,1.49-1.21,2.96-2.44,4.3999-3.71.71008-.61,1.41016-1.24,2.1001-1.87.52-.47,1.04-.94,1.55-1.42,1.0299-.97,2.03991-1.93,3.03991-2.91.5-.48.99-.98,1.49-1.48.49012-.5.99012-1,1.48011-1.51.16992-.17.33984-.35.51-.53.5-.53,1-1.07,1.5-1.6.42993-.46.84985-.94,1.2799-1.42.7201-.8,1.45008-1.6,2.16-2.41a1.53372,1.53372,0,0,1,.12-.12994c.03992-.05.08-.09.11-.13h-.01a156.932,156.932,0,0,0-31.27-232.97Z" transform="translate(-128.49946 -52.18526)" fill="#6c63ff"/><g opacity="0.15"><path d="M799.57156,118.2174a78.59589,78.59589,0,0,0,8.90747,20.31988,108.18092,108.18092,0,0,1-17.44281-19.04921Q795.2766,118.686,799.57156,118.2174Z" transform="translate(-128.49946 -52.18526)"/><path d="M701.994,228.95439a111.70591,111.70591,0,0,0-20.62825,14.50022,113.72127,113.72127,0,0,0,22.80874-43.24937c.053-.191.10641-.3833.158-.5746l.14875-.54118a111.17561,111.17561,0,0,1,29.57395-49.9535l1.10918-1.08072.78224,1.33553a108.70576,108.70576,0,0,0,15.41962,20.31661C742.296,195.30125,724.64606,216.60254,701.994,228.95439Z" transform="translate(-128.49946 -52.18526)"/><path d="M754.12258,160.83931l-.14875.54119c-.05163.19129-.105.38363-.158.57459-.29213,1.05232-.60258,2.09668-.9229,3.13656a115.87114,115.87114,0,0,1-6.62184-25.4162l-.11633-.73788.60665-.43354a112.16118,112.16118,0,0,1,24.60116-13.37342A111.42726,111.42726,0,0,0,754.12258,160.83931Z" transform="translate(-128.49946 -52.18526)"/><path d="M652.35278,267.20453a100.592,100.592,0,0,0,18.2784-12.83063,111.14738,111.14738,0,0,0,37.39487,173.177l.50565.23347.50454-.22774a106.62929,106.62929,0,0,1,26.358-8.004,76.16989,76.16989,0,0,0-15.751,10.69333l-1.61786,1.39888,2.0297.67c1.75177.57939,3.50425,1.11241,5.20739,1.5852a112.22255,112.22255,0,0,0,30.74329,4.11339c47.20153-.30231,94.76951,10.6103,141.38167,32.43391a158.83167,158.83167,0,0,0,24.788,9.16144,156.27529,156.27529,0,0,0,111.10276-10.4229,157.13225,157.13225,0,0,1-160.744,48.673,158.83062,158.83062,0,0,1-24.788-9.16143C801.134,486.87379,753.566,475.96118,706.36449,476.26349a112.22205,112.22205,0,0,1-30.74329-4.11338c-1.70314-.4728-3.45562-1.00581-5.2074-1.58521l-2.02969-.67L670.002,468.496a76.17,76.17,0,0,1,15.751-10.69333,106.62906,106.62906,0,0,0-26.358,8.004l-.50453.22773-.50565-.23346a111.201,111.201,0,0,1-6.032-198.59649Z" transform="translate(-128.49946 -52.18526)"/></g></svg>
        </div>

        <h1 className=" text-center font-extrabold mt-2 text-2xl font-sans mb-[-8px]"> Create Account </h1>
        <div class="divider"></div> 

        <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
            Your email
            </label>
            <input
            type="email"
            placeholder="Email Address"
            value={user.email}
            onChange={(e) => setUserData({ ...user, email: e.target.value })}
            className="input input-bordered w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>

        {usedEmailCheck !== false && 
            <div className="alert alert-error shadow-lg mb-4 mt-4">
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Email already in use.</span>
                </div>
            </div>
        }

        <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2">
            Password
            </label>
            <input
            placeholder="Password"
            type="password"
            value={user.password}
            onChange={(e) => setUserData({ ...user, password: e.target.value })}
            className="shadow input input-bordered w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>

        <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2">
            Confirm password
            </label>
            <input
            placeholder="Confirm Password"
            type="password"
            value={comfirmPassword.password}
            onChange={(e) =>  setComfirmPassword({...comfirmPassword, password: e.target.value})}
            className="shadow input input-bordered w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>

        {passwordsMatchCheck !== false && 
            <div className="alert alert-error shadow-lg mb-4 mt-4">
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Passwords do not match.</span>
                </div>
            </div>
        }

        <div className="flex items-center justify-between w-full"> 
            <button className="btn btn-primary w-full"> Create </button>
        </div>
      </form>
    );
};


export default CreateAccount
