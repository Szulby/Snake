const path = require('path')

module.exports = {
	entry: './src/index.jsx',
	output: {
		filename: 'bundle.min.js',
		path: path.resolve(__dirname, './dist')
	},
	watch: false,
	mode: 'development',
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.(js|jsx|)$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react',
							{
								plugins: [
									'@babel/plugin-proposal-class-properties',
									'@babel/plugin-proposal-export-default-from'
								]
							}
						]
					}
				}
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	}
}
