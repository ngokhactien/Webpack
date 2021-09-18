const path = require('path');
const HelloWorldPlugin =  require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack') ;                             //jquery


// dùng để import các thư viện trên webside sau chỉ dùng ko cần phải tải lại nữa
const VENDOR_LIBS = [
    "axios",
    // "font-awesome",
    //"bootstrap"
    "jquery",
    "react",
    "react-dom",
    "react-redux",
    "react-router-dom",
    "redux",
    "redux-thunk",
] 

const config = {
    // entry : './src/index.js',                        // điểm bắt đầu , 1 file
    // entry : {                                        // 2 file khác nhau
    //     main : './src/index.js', 
    //     test : './src/test.js', 
    // },    
    entry : {                                        // 1 file duy nhất
        main :[
            './src/index.js', 
            // './src/test.js', 
        ] ,
        vendor : VENDOR_LIBS        // giúp nó tải riêng thư viện ra chạy web nó chỉ cần load thư viên 1 lần , lần sau nó ko cần tải lại
    },    
    output : {                                      // đầu ra
        // filename : 'index.js',
        filename : '[name].js',// cái này dành cho 2 file   // tạo file đóng gói ; ko có path thì sẽ tạo thư mục ngoài cùng  ; bundle.js này nó sẽ repuire từ file index.js rồi nó sẽ chạy code
        path : path.resolve(__dirname , 'build'),   // cái này tạo thư mục build chưa file bundle.js
        clean : true ,
    },
    mode : 'development',      // or   devtool: 'inline-source-map'      // mode để tạo ra file webpack cho ai xem , và xem được dự án sai ở đâu , còn devtool chỉ xem được dự án sai ở đâu
    // watch : true ,                      // luôn lắng nghe của webpack
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                
            },  
            {                                                        // css
                use: [MiniCssExtractPlugin.loader, "css-loader"],
                test: /\.css$/i,
            }, 
            {
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
                test: /\.(png|jpe?g|gif)$/i,
            },
        ]
    },
    plugins: [                // dùng để tạo ra file html // luôn lăng nghe của webpack thay đổi thì sẽ cập nhập lại tại html
        new HelloWorldPlugin(           // mặc định ()
            {
                title : ' My Product' ,  // đặt title của html 
                filename : 'index.html',   // cái này muốn đặt ở đâu và tên gì vd : ./src/test/mywebpack.html
                template : './src/index.html'
            }
        ) ,
        new MiniCssExtractPlugin() ,   // css
        new webpack.ProvidePlugin({     //jquery
            $: 'jquery',
            jQuery: 'jquery',
        })         
    ],
    devServer: {                        // dùng để chạy server cái này dùng lệnh riêng để chạy ở package phần dev
        static: {                       // dùng để chạy  file html
            directory: path.join(__dirname , './'),
        },
        compress: true, 
        port: 9000, 
        open : true                     // tự động mở trình duyệt
    },
    optimization: {                 // dùng để giải nét file nhẹ //và tạo file dùng chung cho sự án // nó sẽ tạo ra 1 file thư viện dùng chung cho những file nào cần
        splitChunks: {
            chunks: 'all',
        }
    }   
}

module.exports = config ;